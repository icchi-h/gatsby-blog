import React from 'react';
import { Link } from 'gatsby';

import PostMetaInfo from '../post-meta-info';
import Image from '../image';
import RemoteImage from '../remote-image';
import styles from './index.module.scss';
import * as config from '../../config/blog-config.js';

class PostPreview extends React.Component {
  render() {
    const {
      slug,
      title,
      excerpt,
      date,
      category,
      tags,
      thumbnail,
      url,
      src,
    } = this.props.postField;
    const isQiita = src === config.postType.qiita;

    const postImage = isQiita ? (
      <RemoteImage url={thumbnail} alt={'thumbnail'} />
    ) : (
      <Image
        className={styles.content_thumbnail_image}
        filename={thumbnail || config.defaultThumbnailImagePath}
        alt={'thumbnail'}
      />
    );

    const article = !isQiita ? (
      <div>
        <div className={styles.content_thumbnail}>
          <Link className={styles.title_link} to={slug}>
            {postImage}
          </Link>
        </div>
        <div className={styles.content_post_info}>
          <Link className={styles.title_link} to={slug}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <p
            className={styles.content_text}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <PostMetaInfo
            category={category}
            tags={tags}
            date={date}
            color="#414141"
          />
        </div>
      </div>
    ) : (
      <div>
        <div className={styles.content_thumbnail}>
          <a
            className={styles.title_link}
            href={url}
            target="_blank"
            rel="noopener"
          >
            {postImage}
          </a>
        </div>
        <div className={styles.content_post_info}>
          <a
            className={styles.title_link}
            href={url}
            target="_blank"
            rel="noopener"
          >
            <h3 className={styles.title}>{title}</h3>
          </a>
          <p
            className={styles.content_text}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <PostMetaInfo
            category={category}
            tags={tags}
            date={date}
            color="#414141"
          />
        </div>
      </div>
    );

    return (
      <article key={slug} className={styles.content}>
        {article}
      </article>
    );
  }
}

export default PostPreview;
