import React, { useState } from "react";

// Styled Components
import { Wrapper } from "./SearchBar.styles";

// Hooks
import { useHomeFetch } from "../../hooks/useHomeFetch";

// Bootstrap
import { Container, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchBar = ({ setSearchTerm }) => {
	const [state, setState] = useState("");

	const doSearch = (e) => {
		e.preventDefault();
		setSearchTerm(state);
	};

	return (
		<Wrapper className="max-width-margin">
			<Form onSubmit={doSearch}>
				<Form.Group className="mb-3 " controlId="formSearchTerm">
					<div className="two-columns gap">
						<div className="flex-fill">
							<Form.Control
								type="text"
								placeholder="Search for ..."
								onChange={(e) => {
									setState(e.currentTarget.value);
								}}
							/>
						</div>

						<div>
							<Button variant="primary" type="submit">
								Search
							</Button>
						</div>
					</div>
				</Form.Group>
			</Form>
		</Wrapper>
	);
};

export default SearchBar;
