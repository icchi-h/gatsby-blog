import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithubSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import config from '../../config/blog-config.js'
import styles from './index.module.scss'
/* highlight-range{1-3} */
class Bio extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <a
          aria-label="profile_link"
          href={config.blogAuthorUrl}
          target="_blank"
          rel="noopener"
        >
          <img
            src={config.blogAuthorAvatarUrl}
            alt={config.blogAuthor}
            className={styles.avatar}
          />
        </a>
        <div className={styles.main}>
          <div className={styles.description}>{config.blogDescription}</div>
          <div className={styles.profile}>
            <a
              aria-label="profile_link_profile"
              className={styles.profile__link}
              href={config.blogAuthorUrl}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon
                color="#f5f5f5"
                size="sm"
                className={styles.profile__icon}
                icon={faAddressCard}
              />
            </a>
            <a
              aria-label="profile_link_twitter"
              className={styles.profile__link}
              href={config.blogAuthorTwitterUrl}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon
                color="#3eaded"
                size="sm"
                className={styles.profile__icon}
                icon={faTwitterSquare}
              />
            </a>
            <a
              aria-label="profile_link_github"
              className={styles.profile__link}
              href={config.blogAuthorGitHubUrl}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon
                color="#eee"
                size="sm"
                className={styles.profile__icon}
                icon={faGithubSquare}
              />
            </a>
            <a
              aria-label="profile_link_qiita"
              className={styles.profile__link}
              href={config.blogAuthorQiitaUrl}
              target="_blank"
              rel="noopener"
            >
              <FontAwesomeIcon
                color="white"
                size="sm"
                className={styles.profile__icon_qiita}
                icon={faSearch}
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Bio
