const {
  createFilePath,
  createRemoteFileNode,
} = require('gatsby-source-filesystem');

const unified = require('unified');
const remarkParse = require('remark-parse');
const remark2rehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');
const striptags = require('striptags');
const config = require('../../src/config/blog-config.js');

const isMarkdownPost = type => type === 'MarkdownRemark';
const isQiitaPost = type => type === 'QiitaPost';

const createRemoteFile = async (url, cache, store, actions, createNodeId) => {
  try {
    const fileNode = await createRemoteFileNode({
      url: url,
      cache,
      store,
      createNode: actions.createNode,
      createNodeId: createNodeId,
    });
    await actions.createNodeField({
      node: fileNode,
      name: 'RemoteImage',
      value: true,
    });
    await actions.createNodeField({
      node: fileNode,
      name: 'link',
      value: url,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Markdown記事とQiita記事のインターフェースを共通化
 */
exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  cache,
  store,
}) => {
  // check article node
  if (!isMarkdownPost(node.internal.type) && !isQiitaPost(node.internal.type)) {
    return;
  }

  // extract qiita thumbnail url from body (not ogp)
  const qiitaThumbnailUrl = !isQiitaPost(node.internal.type)
    ? ''
    : getQiitaThumbnail(node.rendered_body);

  const [
    slug,
    title,
    date,
    excerpt,
    tags,
    keywords,
    thumbnail,
    src,
    url,
  ] = isMarkdownPost(node.internal.type)
    ? [
        node.frontmatter.slug || createFilePath({ node, getNode }), // 記事でURL指定があればそちらを優先する
        node.frontmatter.title,
        node.frontmatter.date,
        _excerptMarkdown(node.rawMarkdownBody, 120),
        node.frontmatter.tags,
        // キーワード指定がない場合は、タグの一番目が一番重要とみなし、それをキーワードとする
        node.frontmatter.keywords || [node.frontmatter.tags[0]],
        node.frontmatter.thumbnail || '',
        config.postType.original,
        '',
      ]
    : [
        `/${node.id}/`,
        node.title,
        node.created_at,
        _excerptHtml(node.rendered_body, 120),
        [...(node.tags.map(tag => tag.name) || []), 'Qiita'], // Qiitaタグを追加
        [node.tags[0].name],
        qiitaThumbnailUrl,
        config.postType.qiita,
        node.url,
      ];

  actions.createNodeField({ name: `slug`, node, value: slug });
  actions.createNodeField({ name: `title`, node, value: title });
  actions.createNodeField({ name: `date`, node, value: date });
  actions.createNodeField({ name: `excerpt`, node, value: excerpt });
  actions.createNodeField({ name: `tags`, node, value: tags });
  actions.createNodeField({ name: `keywords`, node, value: keywords });
  actions.createNodeField({ name: `thumbnail`, node, value: thumbnail });
  actions.createNodeField({ name: `src`, node, value: src });
  actions.createNodeField({ name: `url`, node, value: url });

  // Create remote file node of thumbnail image
  if (isQiitaPost(node.internal.type)) {
    // qiita article ogp

    // qiita thumbnail (in body image, not ogp)
    if (!!qiitaThumbnailUrl && qiitaThumbnailUrl !== '') {
      await createRemoteFile(
        qiitaThumbnailUrl,
        cache,
        store,
        actions,
        createNodeId
      );
    }
  }
};

function _excerptMarkdown(markdown, length) {
  const { contents: html } = unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(markdown);

  return _excerptHtml(html, length);
}

function _excerptHtml(html, length) {
  const postContent = striptags(html)
    .replace(/\r?\n/g, '')
    .trim();
  return postContent.length <= length
    ? postContent
    : postContent.slice(0, length) + '...';
}

function getQiitaThumbnail(articleBody) {
  const getImgs = imgTags => {
    return imgTags.map(imgTag => {
      let srcs = imgTag.match(/data-canonical-src=".*?"/);
      if (srcs)
        srcs = srcs.map(item =>
          item.replace('data-canonical-src=', '').replace(/"/g, '')
        );
      let alts = imgTag.match(/alt=".*?"/);
      if (alts)
        alts = alts.map(item => item.replace('alt=', '').replace(/"/g, ''));

      return {
        src: srcs ? srcs[0] : null,
        alt: alts ? alts[0] : null,
      };
    });
  };

  const regex = /<img(?: .+?)?>/gi;
  const imgTags = articleBody.match(regex);
  const imgs = imgTags ? getImgs(imgTags) : null;
  // console.log(imgs);

  if (imgs) {
    // filtering image has 'thumbnail' value
    const thumbnails = imgs.filter(img => img.alt === 'thumbnail');
    if (thumbnails.length > 0) {
      // get first image
      const thumbnail = thumbnails[0];
      return thumbnail.src ? thumbnail.src : null;
    } else {
      return null;
    }
  }
}
