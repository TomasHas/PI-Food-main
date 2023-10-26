import React from "react";
import styles from "./pagination.module.css";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pageNumbers = [];

  //sets the numbes for pagination
  for (let i = 1; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage > totalPages) setCurrentPage(currentPage);
  };
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <button className={styles.btn} onClick={handlePrev}>
          prev
        </button>
        {pageNumbers.map((number, i) => (
          <button
            className={styles.btn}
            key={number}
            onClick={() => setCurrentPage(number)}
            disabled={number === currentPage}
          >
            {number}
          </button>
        ))}
        <button
          className={styles.btn}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
