import React from 'react';
import { Link } from 'gatsby';

import PostMetaInfo from '../post-meta-info';
import Image from '../image';
import RemoteImage from '../remote-image';
import styles from './index.module.scss';
import * as config from '../../config/blog-config.js';

class PostPreviewSmall extends React.Component {
  render() {
    const {
      slug,
      title,
      // excerpt,
      date,
      tags,
      thumbnail,
      src,
      url,
    } = this.props.postField;
    const isQiita = src === config.postType.qiita;

    const postImage =
      isQiita && thumbnail ? (
        <RemoteImage url={thumbnail} alt={'thumbnail'} />
      ) : (
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
      );

    const article = !isQiita ? (
      <div className={styles.content_inner}>
        <Link className={styles.content_thumbnail} key={slug} to={slug}>
          {postImage}
        </Link>
        <div className={styles.content_post_info}>
          <Link key={slug} to={slug}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <div className={styles.post_meta_info}>
            <PostMetaInfo tags={tags} date={date} />
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.content_inner}>
        <a
          className={styles.content_thumbnail}
          href={url}
          target="_blank"
          rel="noopener"
        >
          {postImage}
        </a>
        <div className={styles.content_post_info}>
          <a href={url} target="_blank" rel="noopener">
            <h3 className={styles.title}>{title}</h3>
          </a>
          <div className={styles.post_meta_info}>
            <PostMetaInfo tags={tags} date={date} />
          </div>
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

export default PostPreviewSmall;
