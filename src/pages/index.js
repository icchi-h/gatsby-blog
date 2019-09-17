import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import Layout from '../components/layout'
import PostList from '../components/post-list'
import TagList from '../components/tag-list'
import Title from '../components/title'

import config from '../config/blog-config'

class BlogIndex extends React.Component {
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
    const blogPosts = get(this, 'props.data.allMarkdownRemark.edges', [])
    const qiitaPosts = get(this, 'props.data.allQiitaPost.edges', [])

    // マージして降順で並び替え
    let posts = [...blogPosts, ...qiitaPosts].sort((a, b) => {
      const aDate = new Date(a.node.fields.date)
      const bDate = new Date(b.node.fields.date)

      if (aDate < bDate) return 1
      if (aDate > bDate) return -1
      return 0
    })

    return (
      <Layout location={this.props.location}>
        <Title />
        <PostList postFields={posts.map(post => post.node.fields)} />
        <TagList posts={posts} />
      </Layout>
    )
  }
}

export default BlogIndex

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
            tags
            src
            url
          }
          comments_count
          likes_count
        }
      }
    }
  }
`
