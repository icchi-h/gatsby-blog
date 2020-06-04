// import React from 'react'
// import { graphql } from 'gatsby'
// import Layout from '../components/layout'
// import PostLinkItem from '../components/post-link-item'
// import SEO from '../components/seo'

// const IndexTemplate = props => {
//   const Posts = props.data.allMarkdownRemark.edges
//     .filter(edge => !!edge.node.frontmatter.date)
//     .map(edge => <PostLinkItem key={edge.node.id} post={edge.node} />)

//   return (
//     <Layout>
//       <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
//       <div>{Posts}</div>
//       // Pagination関数の実行
//       <Pagination props={props} />
//     </Layout>
//     <Layout location={this.props.location}>
//         <Title />
//         <PostList postFields={posts.map(post => post.node.fields)} />
//         <TagList posts={posts} />
//       </Layout>
//   )
// }

import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import Layout from '../components/layout';
import PostList from '../components/post-list';
import TagList from '../components/tag-list';
import Title from '../components/title';
import Pagination from '../components/pagination';

import config from '../config/blog-config';

export default class BlogIndex extends React.Component {
  render() {
    // gatsby-node.jsで2つのノードに共通のfieldsを追加しているため条件分岐なし

    // // 記事ソース情報の追加
    // const blogPosts = get(this, 'props.data.allMarkdownRemark.edges', []).map(
    //   item => {
    //     item.node.fields.src = config.postType.original
    //     return item
    //   }
    // )
    // const qiitaPosts = get(this, 'props.data.allQiitaPost.edges', []).map(
    //   item => {
    //     item.node.fields.src = config.postType.qiita
    //     item.node.fields.url = item.node.url
    //     item.node.fields.comments_count = item.node.comments_count
    //     item.node.fields.likes_count = item.node.likes_count
    //     return item
    //   }
    // )
    const blogPosts = get(this, 'props.data.allMarkdownRemark.edges', []);
    const qiitaPosts = get(this, 'props.data.allQiitaPost.edges', []);

    // マージして降順で並び替え
    let allPosts = [...blogPosts, ...qiitaPosts].sort((a, b) => {
      const aDate = new Date(a.node.fields.date);
      const bDate = new Date(b.node.fields.date);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });

    // Paginationに合わせて記事のフィルタリング
    const { pageNumber, limit } = this.props.pageContext;
    const startIdx = pageNumber * limit;
    const posts = allPosts.slice(startIdx, startIdx + limit);

    return (
      <Layout location={false}>
        <Title />
        <PostList postFields={posts.map((post) => post.node.fields)} />
        <Pagination props={this.props} />
        <hr style={{ marginTop: '48px' }} />
        <TagList posts={allPosts} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            title
            excerpt
            date
            category
            tags
            thumbnail
            src
            url
          }
        }
      }
    }
    allQiitaPost(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            title
            excerpt
            date
            category
            tags
            thumbnail
            src
            url
          }
          comments_count
          likes_count
        }
      }
    }
  }
`;
