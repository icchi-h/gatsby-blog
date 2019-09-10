import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import config from '../../config/blog-config'
import styles from './index.module.scss'

class Rss extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <a
          aria-label="blog_map"
          href="/blog-map"
          className={`${styles.button} ${styles.blog_map_link}`}
        />
        <a
          aria-label="blog_repository"
          href={config.blogRepositoryUrl}
          rel="noopener noreferrer"
          className={`${styles.button}`}
        >
          <FontAwesomeIcon color="#eee" icon={faGithub} />
        </a>
        <a
          aria-label="feedly"
          className={`${styles.button} ${styles.feedly_link}`}
          href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fblog2.icchi.me%2Frss.xml"
          target="_blank"
        ></a>
        <a
          aria-label="rss"
          className={styles.button}
          href={config.blogRssUrl}
          target="blank"
        >
          <FontAwesomeIcon color="f26522" icon={faRss} />
        </a>
      </div>
    )
  }
}

export default Rss
