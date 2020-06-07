import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import Title from '../components/title';
import PostList from '../components/post-list';
import styles from './search.module.scss';
import Pagination from '../components/pagination';

class TagTemplate extends React.Component {
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

    // 特定タグ要素でフィルタリングされた記事配列
    const filteredPosts = [
      ...get(this, 'props.data.filteredRemarkPosts.edges', []),
      ...get(this, 'props.data.filteredQiitaPosts.edges', []),
    ].sort((a, b) => {
      const aDate = new Date(a.node.fields.date);
      const bDate = new Date(b.node.fields.date);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });

    const totalCount = filteredPosts.length || 0;

    const searchResult = (
      <div className={styles.search_result}>
        <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
        <span>{this.props.pageContext.tag}</span>
        {/* {targetTag} */}
        <div className={styles.search_count}>{totalCount}件</div>
      </div>
    );

    // Paginationに合わせて記事のフィルタリング
    const { pageNumber, limit } = this.props.pageContext;
    const startIdx = pageNumber * limit;
    const posts = filteredPosts.slice(startIdx, startIdx + limit);

    const postList =
      totalCount > 0 ? (
        <PostList postFields={posts.map((post) => post.node.fields)} />
      ) : (
        <div className={styles.no_post}>指定したタグの記事はありません。</div>
      );

    return (
      <Layout location={this.props.location} posts={allPosts}>
        <div>
          <Title tag={this.props.pageContext.tag} />
          {searchResult}
          {postList}
          <Pagination props={this.props} />
        </div>
      </Layout>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    filteredRemarkPosts: allMarkdownRemark(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
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

    filteredQiitaPosts: allQiitaPost(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
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
