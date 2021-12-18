import React from "react";

// Bootstrap
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

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
				onClick={(e) => handleClick(e, number)}>
				{number}
			</Pagination.Item>
		);
	}

	const paginationBasic = (
		<div>
			<Pagination>{items}</Pagination>
			<br />
		</div>
	);

	return <Pagination>{items}</Pagination>;
};

export default Index;
