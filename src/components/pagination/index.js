import { Link } from 'gatsby';
import React from 'react';
import styles from './index.module.scss';

// 数字のページボタンの最大数
const MAX_PAGE_NUM = 5;

const Pagination = ({ props }) => {
  const { pageContext } = props;
  const {
    previousPagePath,
    nextPagePath,
    numberOfPages,
    humanPageNumber,
  } = pageContext;

  let basePath;
  if (previousPagePath) {
    basePath = previousPagePath.replace(/\/page\/\d$/g, '');
  } else if (nextPagePath) {
    basePath = nextPagePath.replace(/\/page\/\d$/g, '');
  }

  let pageNumButton = [];
  if (numberOfPages >= 3) {
    const ellipsisFlag = numberOfPages > MAX_PAGE_NUM;
    const lastPageNum = ellipsisFlag ? numberOfPages - 2 : numberOfPages;
    for (let i = 1; i < lastPageNum; i++) {
      let pagePath = basePath + (i !== 1 ? `/page/${i}` : '');
      pageNumButton.push(
        i !== humanPageNumber ? (
          <Link to={pagePath} className={styles.pagination_num}>
            {i}
          </Link>
        ) : (
          <span className={styles.pagination_num}>{i}</span>
        )
      );
    }

    if (ellipsisFlag) {
      pageNumButton.push(<span>...</span>);
      // draw page link after ...
      for (let i = numberOfPages - 1; i <= numberOfPages; i++) {
        let pagePath = basePath + `/page/${i}`;
        pageNumButton.push(
          i !== humanPageNumber ? (
            <Link to={pagePath} className={styles.pagination_num}>
              {i}
            </Link>
          ) : (
            <span className={styles.pagination_num}>{i}</span>
          )
        );
      }
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
