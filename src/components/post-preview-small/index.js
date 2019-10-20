import React from 'react';
import { Link } from 'gatsby';

import PostMetaInfo from '../post-meta-info';
import Image from '../image';
import styles from './index.module.scss';
import * as config from '../../config/blog-config.js';

class PostPreviewSmall extends React.Component {
  render() {
    const {
      slug,
      title,
      excerpt,
      date,
      tags,
      thumbnail,
      src,
      url,
    } = this.props.postField;
    const isQiita = src === config.postType.qiita;

    const content = (
      <div className={styles.content_inner}>
        <div className={styles.content_thumbnail}>
          <Image
            className={styles.content_thumbnail_image}
            filename={
              thumbnail ||
              (!isQiita
                ? config.defaultThumbnailImagePath
                : config.defaultThumbnailQiitaImagePath)
            }
            alt={'thumbnail'}
          />
        </div>
        <div className={styles.content_post_info}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.post_meta_info}>
            <PostMetaInfo tags={tags} date={date} />
          </div>
        </div>
      </div>
    );

    let article;
    if (!isQiita) {
      article = (
        <Link key={slug} className={styles.content_link} to={slug}>
          {content}
        </Link>
      );
    } else {
      article = (
        <a
          className={styles.content_link}
          href={url}
          target="_blank"
          rel="noopener"
        >
          {content}
        </a>
      );
    }

    return (
      <article key={slug} className={styles.content}>
        {article}
      </article>
    );
  }
}

export default PostPreviewSmall;
