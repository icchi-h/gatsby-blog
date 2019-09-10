import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

import styles from './index.module.scss'

class Tag extends React.Component {
  render() {
    const { value, count, color } = this.props

    if (count) {
      return (
        <div key={value} className={styles.content}>
          <Link to={`/tags/${kebabCase(value)}`} className={styles.link}>
            <span className={styles.tag_name} style={{ color: color }}>
              {value}
            </span>
            <span className={styles.tag_count}>{count}</span>
          </Link>
        </div>
      )
    } else {
      return (
        <div key={value} className={styles.content}>
          <Link to={`/tags/${kebabCase(value)}`} className={styles.link}>
            <span className={styles.tag_name} style={{ color: color }}>
              {value}
            </span>
          </Link>
        </div>
      )
    }
  }
}

export default Tag
