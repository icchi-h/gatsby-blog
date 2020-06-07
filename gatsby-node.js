const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const relatedPost = require('./gatsby-related-post');
const { paginate } = require('gatsby-awesome-pagination');
const moment = require('moment');
const config = require('./src/config/blog-config');

// onCreateNodeより後に実行される
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [fields___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                html
                fields {
                  slug
                  title
                  date
                  excerpt
                  category
                  tags
                  keywords
                  thumbnail
                  src
                  url
                }
              }
            }
          }
          allQiitaPost(
            sort: { fields: [fields___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                  title
                  date
                  excerpt
                  category
                  tags
                  keywords
                  thumbnail
                  src
                  url
                }
                id
                title
                rendered_body
                body
                comments_count
                created_at
                likes_count
                reactions_count
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        console.error(result.errors);
        reject(result.errors);
      }

      // オリジナル記事とQiitaの記事を1つのリストにする
      const originalPosts = result.data.allMarkdownRemark.edges.map((p) => {
        return {
          type: config.postType.original,
          date: new Date(p.node.fields.date),
          node: p.node,
        };
      });
      const qiitaPosts = result.data.allQiitaPost.edges.map((p) => {
        return {
          type: config.postType.qiita,
          date: new Date(p.node.fields.date),
          node: p.node,
        };
      });
      const posts = [...originalPosts, ...qiitaPosts].sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });

      const allPostNodes = _.map(posts, ({ node }) => node);

      // 記事詳細ページ生成
      _.each(posts, ({ type, node }, index) => {
        // 最大5つ関連記事を取得
        const relatedPosts = relatedPost
          .extractRelatedPosts(allPostNodes, node, relatedPost.defaultConfig)
          .slice(0, 5);
        const latestPosts = allPostNodes.slice(0, 5);

        if (type === config.postType.original) {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
              slug: node.fields.slug,
              relatedPosts,
              latestPosts,
              ...previouseAndNext(posts, index),
            },
          });
        } else if (type === config.postType.qiita) {
          // Disable: qiita article page
          // createPage({
          //   path: node.fields.slug,
          //   component: path.resolve('./src/templates/qiita-post.js'),
          //   context: {
          //     slug: node.fields.slug,
          //     relatedPosts,
          //     latestPosts,
          //     ...previouseAndNext(posts, index),
          //   },
          // })
        } else {
          throw new Error(`Unexpected post type: ${type}`);
        }
      });

      //  ページネーション付き記事リスト画面作成
      paginate({
        createPage,
        items: posts,
        itemsPerPage: config.postNumberPerPage,
        pathPrefix: ({ pageNumber }) => {
          return pageNumber === 0 ? '/' : '/page';
        },
        // pathPrefix: '/',
        component: path.resolve('src/templates/index.js'),
      });

      // 記事関連情報生成
      // const allPostRelations = allPostNodes.map(node => {
      //   const conf = Object.assign({}, relatedPost.defaultConfig, {
      //     threshold: 50,
      //   })

      //   return {
      //     node,
      //     relations: relatedPost.extractRelatedPostRankings(
      //       allPostNodes,
      //       node,
      //       conf
      //     ),
      //   }
      // })

      // タグと対応する記事のセットを生成
      let tagArticles = {};
      for (let post of posts) {
        const tags = post.node.fields.tags;
        for (let tag of tags) {
          if (tagArticles.hasOwnProperty(tag)) {
            tagArticles[tag].push(post);
          } else {
            tagArticles[tag] = [post];
          }
        }
      }

      // 各タグ別に一覧ページ生成
      for (let tag in tagArticles) {
        paginate({
          createPage,
          items: tagArticles[tag],
          itemsPerPage: config.postNumberPerPage,
          pathPrefix: ({ pageNumber }) => {
            return pageNumber === 0
              ? `/tag/${_.kebabCase(tag)}/`
              : `/tag/${_.kebabCase(tag)}/page`;
          },
          component: path.resolve('./src/templates/tag.js'),
          context: {
            tag,
          },
        });
      }

      // カテゴリと対応する記事のセットを生成
      let categoryArticles = {};
      for (let post of posts) {
        const category = post.node.fields.category;
        if (categoryArticles.hasOwnProperty(category)) {
          categoryArticles[category].push(post);
        } else {
          categoryArticles[category] = [post];
        }
      }

      // 各カテゴリ別に一覧ページ生成
      for (let category in categoryArticles) {
        paginate({
          createPage,
          items: categoryArticles[category],
          itemsPerPage: config.postNumberPerPage,
          pathPrefix: ({ pageNumber }) => {
            return pageNumber === 0
              ? `/category/${_.kebabCase(category)}/`
              : `/category/${_.kebabCase(category)}/page`;
          },
          component: path.resolve('./src/templates/category.js'),
          context: {
            category,
          },
        });
      }

      // アーカイブ(年月)と対応する記事のセットを生成
      let archiveArticles = {};
      for (let post of posts) {
        // 年、月情報を抜き出し
        const date = moment(post.node.fields.date);
        const year = date.format('YYYY');
        const month = date.format('MM');

        // まだ記録されていなければオブジェクトにセット
        // {<year>: {<month>: [...posts]}}
        if (archiveArticles.hasOwnProperty(year)) {
          if (archiveArticles[year].hasOwnProperty(month)) {
            archiveArticles[year][month].push(post);
          } else {
            archiveArticles[year][month] = [post];
          }
        } else {
          archiveArticles[year] = {};
          archiveArticles[year][month] = [post];
        }
      }

      // 各アーカイブ別(年月)に一覧ページ生成
      for (let year in archiveArticles) {
        for (let month in archiveArticles[year]) {
          paginate({
            createPage,
            items: archiveArticles[year][month],
            itemsPerPage: config.postNumberPerPage,
            pathPrefix: ({ pageNumber }) => {
              return pageNumber === 0
                ? `/archive/${year}/${month}/`
                : `/archive/${year}/${month}/page`;
            },
            component: path.resolve('./src/templates/archive.js'),
            context: {
              year: parseInt(year),
              month: parseInt(month),
              from: `${year}-${month}-01T00:00:00.000Z`,
              to: `${year}-${month + 1}-01T00:00:00.000Z`,
            },
          });
        }
      }

      // タグ一覧ページの生成
      createPage({
        path: '/tag-list',
        component: path.resolve('./src/templates/tag-list.js'),
        // context: {},
      });

      resolve('OK');
    });
  });
};

/**
 * 指定したインデックスの記事の前後の記事を取得する.
 *
 * @param {Array} posts 記事一覧
 * @param {int} index 対象記事のインデックス
 */
function previouseAndNext(posts, index) {
  return {
    previous: index === posts.length - 1 ? null : posts[index + 1].node,
    next: index === 0 ? null : posts[index - 1].node,
  };
}

// function countDiff(a, b) {
//   return a
//     .split('')
//     .map((charA, i) => (charA === b[i] ? 0 : 1))
//     .reduce((a, b) => a + b, 0)
// }
//
// function craeteWordCount(text, w, h) {
//   const excludeWords = [
//     'よう',
//     'こと',
//     '指定',
//     '時',
//     '追加',
//     '設定',
//     '記事',
//     '用',
//     '情報',
//     'ため',
//     'もの',
//     'これ',
//     '/',
//     '(',
//     ')',
//     '&',
//     '+',
//     '複数',
//     '用意',
//     '構成',
//     '配下',
//     '下記',
//     '今回',
//     '確認',
//     '公開',
//     '関連',
//     '取得',
//     '作成',
//     '場合',
//     '定義',
//     '方法',
//     '生成',
//     '実行',
//     '表示',
//     '紹介',
//     '資産',
//     '参考',
//     '機能',
//     '以下',
//     '更新',
//     '化',
//     '必要',
//     '一部',
//     '側',
//     '実装',
//     'ファイル',
//     'サイト',
//     'イン',
//     '自分',
//     'プラグ',
//     '的',
//     'さん',
//     'とき',
//     'の',
//     '系',
//     '便利',
//     '簡単',
//     '使用',
//     'それ',
//     'あれ',
//     '感じ',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '0',
//     'SETTINGS',
//     'MS',
//     'CONFIG',
//     '://',
//   ]

//   /** kuromoji.jsにバンドルされている辞書の格納場所 */
//   const DIC_URL = 'node_modules/kuromoji/dict'

//   /** WordCloudでカウントする品詞（助詞・助動詞などは省く） */
//   const TARGET_POS = ['名詞']

//   /** kuromoji.jsで該当プロパティの値が存在しない場合に設定されている値 */
//   const NO_CONTENT = '*'

//   // kuromoji.jsで形態素解析
//   // 単語ごとの出現回数を出力
//   return new Promise((resolve, reject) => {
//     kuromoji.builder({ dicPath: DIC_URL }).build((err, tokenizer) => {
//       if (err) {
//         return reject(err)
//       }

//       // 単語ごとの出現回数を出力
//       const words = tokenizer
//         .tokenize(text)
//         .filter(t => TARGET_POS.includes(t.pos))
//         .map(t => (t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form))
//         .reduce((data, text) => {
//           const upperText = text.toUpperCase()
//           if (excludeWords.includes(upperText)) {
//             return data
//           }

//           const target = data.find(c => c.text === upperText)

//           if (target) {
//             target.size = target.size + 1
//             if (!target.rawTexts.includes(text)) {
//               target.rawTexts.push(text)
//             }
//           } else {
//             data.push({
//               text: upperText,
//               rawTexts: [text],
//               size: 1,
//             })
//           }
//           return data
//         }, [])
//         .map(data => {
//           const almostSameText = data.rawTexts
//             .map(text => {
//               return {
//                 text,
//                 diff: countDiff(text, data.text),
//               }
//             })
//             .reduce((a, b) => (a.diff <= b.diff ? a : b)).text // 大文字に近いほうを採用する

//           return {
//             text: almostSameText,
//             size: data.size,
//           }
//         })

//       resolve(words)
//     })
//   })
// }

// function createWordCloud({ words, w, h, fontSizePow, fontSizeZoom, padding }) {
//   // D3-Cloudによる解析
//   return (
//     new Promise((resolve, reject) => {
//       cloud()
//         .size([w, h])
//         .canvas(() => createCanvas(w, h))
//         .words(words)
//         .rotate(word => (word.size % 2 === 1 ? 0 : 90))
//         .fontWeight(word => Math.pow(word.size, fontSizePow) * fontSizeZoom)
//         .fontSize(word => Math.pow(word.size, fontSizePow) * fontSizeZoom)
//         .font('meiryo')
//         .padding(padding)
//         .on('end', wordsForCloud => {
//           resolve(wordsForCloud)
//         })
//         .start()
//     })
//       // d3.jsによる解析
//       .then(wordsForCloud => {
//         return new Promise((resolve, reject) => {
//           /** 仮想DOM */
//           const document = new JSDOM(`<body></body>`).window.document

//           d3.select(document.body)
//             .append('svg')
//             .attr('class', 'ui fluid image')
//             .attr('viewBox', `0 0 ${w} ${h}`)
//             .attr('width', '100%')
//             .attr('height', '100%')
//             .append('g')
//             .attr('transform', `translate(${w / 2},${h / 2})`)
//             .selectAll('text')
//             .data(wordsForCloud)
//             .enter()
//             .append('text')
//             .style('font-size', d => `${d.size}px`)
//             .style('font-family', d => d.font)
//             .attr(
//               'transform',
//               d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
//             )
//             .style('fill', (d, i) => d3.schemeCategory10[i % 10])
//             .attr('text-anchor', 'middle')
//             .text(d => d.text)

//           // 最終的にSVGの文字列を返す
//           resolve(document.body.innerHTML)
//         })
//       })
//   )
// }

// function rawText(html) {
//   return striptags(html, '<pre>')
//     .replace(/<pre[\s\S]+?>[\s\S]+?<\/pre>/g, '')
//     .trim()
// }
