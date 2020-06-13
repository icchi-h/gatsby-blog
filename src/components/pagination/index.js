import { Link } from 'gatsby';
import React from 'react';
import styles from './index.module.scss';

// 数字のページボタンの最大数
const MAX_LINK_NUM = 5;

const Pagination = ({ props }) => {
  const { pageContext } = props;
  const {
    previousPagePath,
    nextPagePath,
    numberOfPages,
    humanPageNumber, // 現在のページ数
  } = pageContext;

  let basePath;
  if (previousPagePath) {
    basePath = previousPagePath.replace(/\/page\/\d$/g, '');
  } else if (nextPagePath) {
    basePath = nextPagePath.replace(/\/page\/\d$/g, '');
  }

  // 表示する数字リンクボタンの処理

  let numLinkButton = [];
  const isOmission = numberOfPages > MAX_LINK_NUM; // 要素数省略判定
  const dispLinkCount = 4; // 先頭・末尾の表示するリンク数

  // 要素数が少ない場合はすべて表示
  for (let i = 1; i < numberOfPages + 1; i++) {
    // XXX: なぜかpage11以上の場合にbasePathに`pages/[0-9]*`が代入されている
    let pagePath =
      basePath.replace(/\/page\/[0-9]*/g, '') + (i !== 1 ? `/page/${i}` : '');
    numLinkButton.push(
      // 現在のページの場合はリンク化しない
      i !== humanPageNumber ? (
        <Link to={pagePath} className={styles.pagination_num} key={`pn-${i}`}>
          {i}
        </Link>
      ) : (
        <span className={styles.pagination_num} key={`pn-${i}`}>
          {i}
        </span>
      )
    );
  }

  // 要素数が多い場合は現在のページに合わせて要素を削除
  if (isOmission) {
    // 現在のページが全体の先頭付近のとき
    if (humanPageNumber < dispLinkCount) {
      numLinkButton.splice(
        dispLinkCount,
        numLinkButton.length - (dispLinkCount + 1)
      );
      numLinkButton.splice(
        numLinkButton.length - 1,
        0,
        <span key="np-ommsn">...</span>
      );
    }
    // 現在のページが全体の末尾付近のとき
    else if (humanPageNumber > numberOfPages - dispLinkCount + 1) {
      numLinkButton.splice(1, numLinkButton.length - (dispLinkCount + 1));
      numLinkButton.splice(1, 0, <span key="np-ommsn">...</span>);
    }
    // 現在のページが全体の中央付近のとき
    else {
      // 現在のページの前後、先頭、末尾から1つを残し、それ以外は乗り除く
      numLinkButton.splice(1, humanPageNumber - dispLinkCount / 2 - 1);
      numLinkButton.splice(1, 0, <span key="np-ommsn1">...</span>);
      const backSpliceStartIdx = 1 + dispLinkCount;
      numLinkButton.splice(
        backSpliceStartIdx,
        numLinkButton.length - (backSpliceStartIdx + 1)
      );
      numLinkButton.splice(
        numLinkButton.length - 1,
        0,
        <span key="np-ommsn2">...</span>
      );
    }
  }

  return (
    <div className={styles.pagination}>
      {/* 前のページリンク */}
      {previousPagePath ? (
        <Link to={previousPagePath} className={styles.pagination_pre}>
          前のページ
        </Link>
      ) : null}

      {/* 数字リンク */}
      {numLinkButton}

      {/* 次のページリンク */}
      {nextPagePath ? (
        <Link to={nextPagePath} className={styles.pagination_next}>
          次のページ
        </Link>
      ) : null}
    </div>
  );
};

export default Pagination;
