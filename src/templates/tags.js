import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import Title from '../components/title';
import PostList from '../components/post-list';
import Tag from '../components/tag';
import styles from './tags.module.scss';
import TagList from '../components/tag-list';
import Pagination from '../components/pagination';

class TagsTemplate extends React.Component {
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

    // const totalCount = allPosts && allPosts.length ? posts.length : 0;
    const totalCount = allPosts.length || 0;

    // const targetTag = <Tag value={this.props.pageContext.tag} />

    const tagSearchResult = (
      <div className={styles.tag_search_result}>
        <FontAwesomeIcon icon={faTags} className={styles.tag_icon} />
        <span>{this.props.pageContext.tag}</span>
        {/* {targetTag} */}
        <div className={styles.tag_search_count}>{totalCount}件</div>
      </div>
    );

    // Paginationに合わせて記事のフィルタリング
    const { pageNumber, limit } = this.props.pageContext;
    const startIdx = pageNumber * limit;
    const posts = allPosts.slice(startIdx, startIdx + limit);

    const postList =
      totalCount > 0 ? (
        <PostList postFields={posts.map(post => post.node.fields)} />
      ) : (
        <div className={styles.no_post}>指摘したタグの記事はありません。</div>
      );

    const allTags = [
      ...get(this, 'props.data.allRemarkTags.edges'),
      ...get(this, 'props.data.allQiitaTags.edges'),
    ];

    return (
      <Layout location={this.props.location}>
        <div>
          <Title tag={this.props.pageContext.tag} />
          {tagSearchResult}
          {postList}
          <Pagination props={this.props} />
          <TagList posts={allTags} />
        </div>
      </Layout>
    );
  }
}

export default TagsTemplate;

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
            tags
            thumbnail
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
            tags
            src
          }
        }
      }
    }

    allRemarkTags: allMarkdownRemark {
      edges {
        node {
          fields {
            tags
          }
        }
      }
    }

    allQiitaTags: allQiitaPost {
      edges {
        node {
          fields {
            tags
          }
        }
      }
    }
  }
`;
