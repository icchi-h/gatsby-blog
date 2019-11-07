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
exports.onCreateNode = ({
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
          '',
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

  // 外部ファイルノードの作成
  const sampleImageUrl =
    'https://takumon.com/static/ee3b59e2bc38cfac28b9ce67a21c4225/35bb1/gatsby-image-of-remote-in-building-by-using-create-remote-file-node.png';
  // createRemoteFileNodeで外部の画像のファイルノードを作成する
  createRemoteFileNode({
    url: sampleImageUrl,
    cache,
    store,
    createNode: actions.createNode,
    createNodeId: createNodeId,
  })
    .then(fileNode => {
      // 他ファイルノードと区別するための識別子を付与
      createNodeField({
        node: fileNode,
        name: 'RemoteImage',
        value: 'true',
      });
      // メタ情報として画像のURLを付与
      createNodeField({
        node: fileNode,
        name: 'link',
        value: sampleImageUrl,
      });
    })
    .catch(err => {
      console.error('error!!');
    });
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
