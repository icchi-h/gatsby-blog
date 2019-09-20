import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import Chip from '@material-ui/core/Chip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

import styles from './index.module.scss'

class Tag extends React.Component {
  render() {
    const { value, count, isLink } = this.props
    // const CountTag =

    if (isLink) {
      return (
        <Link to={`/tag/${kebabCase(value)}`} className={styles.tag}>
          <Chip
            icon={<FontAwesomeIcon icon={faTags} />}
            label={
              <span>
                {value}
                {count ? (
                  <span className={styles.tag_count}>{count}</span>
                ) : null}
              </span>
            }
            size="small"
          ></Chip>
        </Link>
      )
    } else {
      return (
        <Chip
          icon={<FontAwesomeIcon icon={faTags} />}
          label={
            <span>
              {value}
              {count ? <span className={styles.tag_count}>{count}</span> : null}
            </span>
          }
          size="small"
          className={styles.tag}
        />
      )
    }
  }
}

export default Tag
