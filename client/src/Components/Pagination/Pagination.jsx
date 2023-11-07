//CSS
import css from "./Pagination.module.css";

const Pagination = ({
  dogsPerPage,
  dogs,
  pagination,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const numberOfPages = Math.ceil(dogs / dogsPerPage);

  if (numberOfPages === 0) {
    return <div></div>;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className={css.paginationContainer}>
      <ul>
        <a
          className={css.arrows}
          onClick={() =>
            currentPage !== 1 ? setCurrentPage(currentPage - 1) : null
          }
        >
          <span> &#8701; </span>
        </a>
        {pageNumbers &&
          pageNumbers.map((number, index) => {
            return (
              <li onClick={() => pagination(number)} key={index}>
                <a> {number} </a>
              </li>
            );
          })}
        <a
          onClick={() =>
            currentPage !== numberOfPages
              ? setCurrentPage(currentPage + 1)
              : null
          }
        >
          <span>&#8702;</span>
        </a>
      </ul>
    </section>
  );
};

export default Pagination;
