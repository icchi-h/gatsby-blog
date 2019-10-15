import React from 'react';
import { Link } from 'gatsby';

import PostMetaInfo from '../post-meta-info';
import Image from '../image';
import styles from './index.module.scss';
import * as config from '../../config/blog-config.js';

class PostPreview extends React.Component {
  render() {
    const {
      slug,
      title,
      excerpt,
      date,
      tags,
      thumbnail,
      url,
      src,
    } = this.props.postField;
    const isQiita =
      src === config.postType.qiita || tags.includes(config.qiitaTag);

    let article;

    if (!isQiita) {
      article = (
        <Link className={styles.title_link} to={slug}>
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
            <p
              className={styles.content_text}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <PostMetaInfo tags={tags} date={date} />
          </div>
        </Link>
      );
    } else {
      article = (
        <a
          className={styles.title_link}
          href={url}
          target="_blank"
          rel="noopener"
        >
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
            <p
              className={styles.content_text}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <PostMetaInfo tags={tags} date={date} />
          </div>
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

export default PostPreview;
