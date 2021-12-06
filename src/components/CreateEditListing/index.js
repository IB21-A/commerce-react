import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

// Styles
import { Wrapper, FormContainer } from "./CreateEditListing.styles";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../API";

const CreateEditListing = () => {
	const { listingId } = useParams();
	const [data, setData] = useState({
		title: "",
		description: "",
		category: "",
		start_bid: "",
		is_active: "false",
	});
	const [categories, setCategories] = useState(["Categories:"]);
	const [error, setErrors] = useState();
	const [loading, setLoading] = useState();

	useEffect(() => {
		// if ListingId exists, then we'll attempt to grab values and populate
		const getCategories = async () => {
			const data = await API.getCategories();
			setCategories(data);
		};

		getCategories();
	}, []);

	const handleChange = ({ currentTarget: input }) => {
		let newData = { ...data };
		newData[input.name] = input.value;
		setData(newData);
	};

	return (
		<Wrapper>
			<h1>{listingId ? "Edit" : "Create"} Listing</h1>
			<FormContainer>
				<Form>
					<Row>
						<Form.Group className="mb-3" controlId="titleInput">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="e.g.: Baseball Cards"
								name="title"
								value={data.title}
								onChange={(e) => {
									handleChange(e);
								}}
								maxLength={80}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="startBidInput">
								<Form.Label>Start Bid</Form.Label>
								<Form.Control
									type="number"
									placeholder="49.99"
									name="start_bid"
									value={data.start_bid}
									onChange={(e) => {
										handleChange(e);
									}}
									maxLength={9}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="CategorySelect">
								<Form.Label>Category</Form.Label>
								<Form.Select aria-label="Floating label select example">
									{/* <option>Populate This Menu Please!</option> */}
									{categories.map((category) => (
										<option value={category.id}>{category.name}</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className="mb-3" controlId="descriptionInput">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={10}
							placeholder="Write a detailed description"
							name="description"
							value={data.description}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
					</Form.Group>
				</Form>
			</FormContainer>
		</Wrapper>
	);
};

export default CreateEditListing;
