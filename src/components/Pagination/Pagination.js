import React from "react";

function Pagination({ page, setPage, totalPages, pageArray }) {
  return (
    <div className="page-container">
      {totalPages > 16 && page > 5 ? (
        <button
          onClick={() => {
            setPage(page - 5);
            window.scrollTo(0, 0);
          }}
        >
          -5 pages
        </button>
      ) : null}
      {page - 1 > 0 ? (
        <button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
        >
          Previous page
        </button>
      ) : null}

      {totalPages > 16 ? (
        <span className="current">
          Page {page} on {totalPages}
        </span>
      ) : (
        pageArray.map((item, index) => {
          return (
            <button
              key={index}
              className={index === page - 1 ? "pages current" : "pages"}
              onClick={() => {
                setPage(item);
                window.scrollTo(0, 0);
              }}
            >
              {item}
            </button>
          );
        })
      )}

      {page + 1 <= totalPages ? (
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
        >
          Next page
        </button>
      ) : null}
      {totalPages > 16 ? (
        <button
          onClick={() => {
            setPage(page + 5);
            window.scrollTo(0, 0);
          }}
        >
          +5 pages
        </button>
      ) : null}
    </div>
  );
}

export default Pagination;
