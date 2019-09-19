import { Link } from 'gatsby'
import React from 'react'
import styles from './index.module.scss'

const Pagination = ({ props }) => {
  const { pageContext } = props
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <div className={styles.pagination}>
      {previousPagePath ? (
        <Link to={previousPagePath} className={styles.pagination_pre}>
          前のページ
        </Link>
      ) : null}
      {nextPagePath ? (
        <Link to={nextPagePath} className={styles.pagination_next}>
          次のページ
        </Link>
      ) : null}
    </div>
  )
}

export default Pagination
