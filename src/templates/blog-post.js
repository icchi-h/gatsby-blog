import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';

import Layout from '../components/layout';
import Post from '../components/post';

// import config from '../config/blog-config'

import 'katex/dist/katex.min.css';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    // 全記事配列
    const allPosts = [
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
      <Layout location={this.props.location} posts={allPosts}>
        <Post
          fields={post.fields}
          headings={post.headingsDetail}
          html={post.html}
          pageContext={this.props.pageContext}
          siteTitle={siteTitle}
        />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      headingsDetail {
        id
        value
        depth
        parents {
          id
          value
          depth
        }
      }
      fields {
        title
        excerpt
        date
        category
        tags
        thumbnail
      }
    }

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
