import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.scss'
import Seo from '../seo'
import Bio from '../bio'
import Rss from '../rss'
import config from '../../config/blog-config'

export default class Header extends React.Component {
  render() {
    // const { location, children } = this.props
    const { location } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + rootPath
    }
    let tagPath = `/tags/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      tagPath = __PATH_PREFIX__ + tagPath
    }
    let mapPath = `/map`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      mapPath = __PATH_PREFIX__ + mapPath
    }

    const isRoot = location ? location.pathname === rootPath : true
    const isTag = location ? location.pathname.startsWith(tagPath) : false
    const isMap = location ? location.pathname.startsWith(mapPath) : false

    let header = null

    if (isRoot || isTag || isMap) {
      header = (
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

    return header
  }
}
