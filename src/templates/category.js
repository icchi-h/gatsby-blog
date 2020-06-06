import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import Title from '../components/title';
import PostList from '../components/post-list';
import styles from './search.module.scss';
import Pagination from '../components/pagination';

class CategoryTemplate extends React.Component {
  render() {
    // マージして降順で並び替え
    // gatsby-node.jsで2つのノードに共通のfieldsを追加しているため条件分岐なし
    const allPosts = [
      ...get(this, 'props.data.filteredRemarkPosts.edges', []),
      ...get(this, 'props.data.filteredQiitaPosts.edges', []),
    ].sort((a, b) => {
      const aDate = new Date(a.node.fields.date);
      const bDate = new Date(b.node.fields.date);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });

    const totalCount = allPosts.length || 0;

    const searchResult = (
      <div className={styles.search_result}>
        <FontAwesomeIcon icon={faFolder} className={styles.icon} />
        <span>{this.props.pageContext.category}</span>
        <div className={styles.search_count}>{totalCount}件</div>
      </div>
    );

    // Paginationに合わせて記事のフィルタリング
    const { pageNumber, limit } = this.props.pageContext;
    const startIdx = pageNumber * limit;
    const posts = allPosts.slice(startIdx, startIdx + limit);

    const postList =
      totalCount > 0 ? (
        <PostList postFields={posts.map((post) => post.node.fields)} />
      ) : (
        <div className={styles.no_post}>
          指定したカテゴリーの記事はありません。
        </div>
      );

    return (
      <Layout location={this.props.location}>
        <div>
          <Title postTitle={this.props.pageContext.category} />
          {searchResult}
          {postList}
          <Pagination props={this.props} />
        </div>
      </Layout>
    );
  }
}

export default CategoryTemplate;

export const pageQuery = graphql`
  query($category: String) {
    filteredRemarkPosts: allMarkdownRemark(
      limit: 1000
      filter: { fields: { category: { eq: $category } } }
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
      filter: { fields: { category: { eq: $category } } }
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
  }
`;
