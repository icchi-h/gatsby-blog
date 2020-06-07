import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import Layout from '../components/layout';
import TagList from '../components/tag-list';
import Title from '../components/title';

// import config from '../config/blog-config';

export default class TagListTemplate extends React.Component {
  render() {
    // 全記事配列
    let allPosts = [
      ...get(this, 'props.data.allMarkdownRemark.edges', []),
      ...get(this, 'props.data.allQiitaPost.edges', []),
    ].sort((a, b) => {
      const aDate = new Date(a.node.fields.date);
      const bDate = new Date(b.node.fields.date);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });

    return (
      <Layout location={false} posts={allPosts}>
        <Title />
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
