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

const SearchBar = ({ setSearchTerms }) => {
  const [state, setState] = useState({ searchTerm: "", category: "" });
  const { categories } = useHomeFetch();

  const doSearch = (e) => {
    e.preventDefault();
    setSearchTerms(state);
  };

  const handleChange = ({ currentTarget: input }) => {
    let newData = { ...state };
    newData[input.name] = input.value;
    setState(newData);
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
                name="searchTerm"
                value={state.searchTerm}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="">
              <Form.Select
                aria-label="Select a category"
                name="category"
                value={state.category}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option key="all-categories" value={0}>
                  All Categories
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
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
