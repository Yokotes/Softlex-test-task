import React from 'react';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import styles from './Pagination.module.scss';

type PaginationProps = {
  totalCount: number;
}

const Pagination = ({
  totalCount
}: PaginationProps) => {
  const pagesCount = Math.ceil(totalCount / 3);
  let pages = [];
  const currentPage = 1;

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i+1);
  }

  return (
    <div className={styles.pagination}>
      {
        pages.map(page => (
          <PrimaryBtn
            key={page}
            className={`${styles.page} ${page === currentPage ? styles.current : ''}`}
          >
            {page}
          </PrimaryBtn>
        ))
      }
    </div>
  )
};

export default Pagination