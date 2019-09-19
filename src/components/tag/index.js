import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

import styles from './index.module.scss'

class Tag extends React.Component {
  render() {
    const { value, count, color, isLink } = this.props

    if (isLink) {
      return (
        <div key={value} className={styles.content}>
          <Link to={`/tag/${kebabCase(value)}`} className={styles.link}>
            <span className={styles.tag_name} style={{ color: color }}>
              {value}
            </span>
            {count ? <span className={styles.tag_count}>{count}</span> : null}
          </Link>
        </div>
      )
    } else {
      return (
        <div key={value} className={styles.content}>
          <span className={styles.tag_name} style={{ color: color }}>
            {value}
          </span>
          {count ? <span className={styles.tag_count}>{count}</span> : null}
        </div>
      )
    }
  }
}

export default Tag
