import React from 'react';
import { Link } from 'gatsby';

import styles from './index.module.scss';
import PostPreviewSmall from '../post-preview-small';

class Paging extends React.Component {
  render() {
    const { previous, next, relatedPosts, latestPosts } = this.props;

    return (
      <div className={styles.context}>
        <div className={styles.context_header}></div>

        {/* {previous && (
          <div className={styles.posts_context}>
            <h2 className={styles.posts_category}>←前の記事</h2>
            <PostPreviewSmall
              key={previous.fields.slug}
              postField={previous.fields}
            />
          </div>
        )}

        {next && (
          <div className={styles.posts_context}>
            <h2 className={styles.posts_category}>次の記事→</h2>
            <PostPreviewSmall key={next.fields.slug} postField={next.fields} />
          </div>
        )} */}

        {relatedPosts && relatedPosts.length > 0 && (
          <div className={styles.posts_context}>
            <h2 className={styles.posts_category}>関連記事</h2>

            {relatedPosts.map(p => (
              <PostPreviewSmall key={p.fields.slug} postField={p.fields} />
            ))}
          </div>
        )}

        {latestPosts && latestPosts.length > 0 && (
          <div className={styles.posts_context}>
            <h2 className={styles.posts_category}>最近の記事</h2>

            {latestPosts.map(p => (
              <PostPreviewSmall key={p.fields.slug} postField={p.fields} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Paging;
