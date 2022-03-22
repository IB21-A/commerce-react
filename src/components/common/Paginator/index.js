import React from "react";

// Bootstrap
import Pagination from "react-bootstrap/Pagination";

// Styles
import { Wrapper } from "./Paginator.styles";

const Index = ({ currentPage, setCurrentPage, totalPages }) => {
  let active = currentPage;
  let items = [];

  const handleClick = (e, number) => {
    setCurrentPage(number);
  };

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(e) => handleClick(e, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Wrapper>
      <Pagination size="lg">{items}</Pagination>
    </Wrapper>
  );
};

export default Index;
