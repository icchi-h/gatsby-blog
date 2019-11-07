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
      tags,
      thumbnail,
      url,
      src,
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

    const content = (
      <div>
        <div className={styles.content_thumbnail}>{postImage}</div>
        <div className={styles.content_post_info}>
          <h3 className={styles.title}>{title}</h3>
          <p
            className={styles.content_text}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <PostMetaInfo tags={tags} date={date} />
        </div>
      </div>
    );

    let article;
    if (!isQiita) {
      article = (
        <Link className={styles.title_link} to={slug}>
          {content}
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

export default PostPreview;
