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
  const { createNodeField } = actions;

  // check article node
  if (
    node.internal.type !== `MarkdownRemark` &&
    node.internal.type !== `QiitaPost`
  )
    return;

  // extract qiita thumbnail url from body (not ogp)
  const qiitaThumbnailUrl =
    node.internal.type !== `QiitaPost`
      ? ''
      : getQiitaThumbnail(node.rendered_body);

  const [slug, title, date, excerpt, tags, keywords, thumbnail, src, url] =
    node.internal.type === `MarkdownRemark`
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

  createNodeField({ name: `slug`, node, value: slug });
  createNodeField({ name: `title`, node, value: title });
  createNodeField({ name: `date`, node, value: date });
  createNodeField({ name: `excerpt`, node, value: excerpt });
  createNodeField({ name: `tags`, node, value: tags });
  createNodeField({ name: `keywords`, node, value: keywords });
  createNodeField({ name: `thumbnail`, node, value: thumbnail });
  createNodeField({ name: `src`, node, value: src });
  createNodeField({ name: `url`, node, value: url });

  if (
    node.internal.type === `QiitaPost` &&
    !!qiitaThumbnailUrl &&
    qiitaThumbnailUrl !== ''
  ) {
    // 外部ファイルノードの作成
    let fileNode;
    try {
      fileNode = await createRemoteFileNode({
        url: qiitaThumbnailUrl,
        cache,
        store,
        createNode: actions.createNode,
        createNodeId: createNodeId,
      });
      await createNodeField({
        node: fileNode,
        name: 'RemoteImage',
        value: true,
      });
      await createNodeField({
        node: fileNode,
        name: 'link',
        value: qiitaThumbnailUrl,
      });
    } catch (err) {
      console.error(err);
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
    // get first image
    const thumbnail = imgs[0];
    return thumbnail.src && thumbnail.alt && thumbnail.alt === 'thumbnail'
      ? thumbnail.src
      : null;
  }
}
