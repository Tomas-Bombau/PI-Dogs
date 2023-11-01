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

  if(numberOfPages === 0){return <div></div>}

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
  



  return (
    <nav className={css.paginationContainer}>
      <ul>
        <a href="/#"
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
                <a href="/#"> {number} </a>
              </li>
            );
          })}
        <a
          href="/#"
          onClick={() =>
            currentPage !== numberOfPages
              ? setCurrentPage(currentPage + 1)
              : null
          }
        >
          <span>&#8702;</span>
        </a>
      </ul>
    </nav>
  );
};

export default Pagination;
