import React from "react";
import "./Pagination.module.css";

const Pagination = ({ dogsPerPage, dogs, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers && pageNumbers.map((number, index) => {
          return (
            <li key={index}>
              <a onClick={() => pagination(number)}> {number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
