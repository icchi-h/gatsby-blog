import React from 'react';
// import { Link } from 'gatsby'

import Bio from '../bio';
import config from '../../config/blog-config';
import styles from './index.module.scss';

// export default function Footer({ isRoot }) {
export default function Footer() {
  return (
    <footer className={styles.content} role="contentinfo">
      <div className={styles.content__inner}>
        <Bio />
        {/* <h4 className={styles.title}>
          <Link className={styles.title__link} to="/">
            {config.blogTitle}
            <i className={styles.icon} />
          </Link>
        </h4> */}

        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()}. {config.blogAuthor}
        </div>
      </div>
    </footer>
  );
}
