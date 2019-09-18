import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.scss'
import Seo from '../seo'
import Bio from '../bio'
import Rss from '../rss'
import config from '../../config/blog-config'

export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.header_container}>
        <Seo isRoot={true} />
        <div className={styles.header_container__inner}>
          <h1 className={styles.blog_title_area}>
            <Link className={styles.blog_title} to={'/'}>
              {config.blogTitle}
            </Link>
          </h1>
          <Bio />
        </div>
        <Rss />
      </div>
    )
  }
}
