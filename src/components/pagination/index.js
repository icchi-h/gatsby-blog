import { Link } from 'gatsby';
import React from 'react';
import styles from './index.module.scss';

const Pagination = ({ props }) => {
  const { pageContext } = props;
  const { previousPagePath, nextPagePath, numberOfPages } = pageContext;

  let basePath;
  if (previousPagePath) {
    basePath = previousPagePath.replace(/\/page\/\d$/g, '');
  } else if (nextPagePath) {
    basePath = nextPagePath.replace(/\/page\/\d$/g, '');
  }

  // 数字のページボタン
  let pageNumButton = [];
  if (numberOfPages >= 3) {
    for (let i = 1; i <= numberOfPages; i++) {
      const pagePath = basePath + (i !== 1 ? `/page/${i}` : '');
      pageNumButton.push(
        <Link to={pagePath} className={styles.pagination_pre}>
          {i}
        </Link>
      );
    }
  } else {
    pageNumButton = null;
  }

  return (
    <div className={styles.pagination}>
      {previousPagePath ? (
        <Link to={previousPagePath} className={styles.pagination_pre}>
          前のページ
        </Link>
      ) : null}
      {pageNumButton}
      {nextPagePath ? (
        <Link to={nextPagePath} className={styles.pagination_next}>
          次のページ
        </Link>
      ) : null}
    </div>
  );
};

export default Pagination;
