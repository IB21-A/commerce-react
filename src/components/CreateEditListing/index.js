import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

// Styles
import { Wrapper, FormContainer } from "./CreateEditListing.styles";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";
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
		image_url: "",
	});
	const [categories, setCategories] = useState([
		{
			id: "noid",
			name: "Server unavailable",
			listings: [],
		},
		{
			id: "noid2",
			name: "",
			listings: [],
		},
	]);
	const [errors, setErrors] = useState({
		title: "",
		description: "",
		category: "",
		start_bid: "",
		image_url: "",
	});
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
		// console.log(input);
		let newData = { ...data };
		newData[input.name] = input.value;
		setData(newData);
		console.log(newData);
	};

	const handleImageChange = (e) => {
		console.log(e.target.files[0]);
		let newData = { ...data };
		newData["image_url"] = e.target.files[0];
		setData(newData);
	};

	const doSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (listingId) {
			// Update listing
		}

		const listing = await API.createListing(data);
		if (listing.status === 400) {
			setErrors(listing.data);
			console.log(listing.data);
		}

		return setLoading(false);
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
								isInvalid={errors.title}
								onChange={(e) => {
									handleChange(e);
								}}
								maxLength={80}
							/>
							{errors.title && (
								<Form.Text className="alert-danger" tooltip>
									{errors.title}
								</Form.Text>
							)}
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Item Image</Form.Label>
							<Form.Control
								type="file"
								name="image_url"
								accept="image/jpeg,image/png,image/gif"
								onChange={(e) => {
									handleImageChange(e);
								}}
							/>
							{errors.image_url && (
								<Form.Text className="alert-danger" tooltip>
									{errors.image_url}
								</Form.Text>
							)}
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
									isInvalid={errors.start_bid}
									onChange={(e) => {
										handleChange(e);
									}}
									maxLength={9}
								/>
								{errors.start_bid && (
									<Form.Text className="alert-danger" tooltip>
										{errors.start_bid}
									</Form.Text>
								)}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="CategorySelect">
								<Form.Label>Category</Form.Label>
								<Form.Select
									aria-label="Floating label select example"
									name="category"
									onChange={(e) => {
										handleChange(e);
									}}>
									<option key={"slect"} value={-1}>
										Select a category
									</option>
									{categories.map((category, index) => (
										<option key={index} value={category.id}>
											{category.name}
										</option>
									))}
								</Form.Select>
								{errors.category && (
									<Form.Text className="alert-danger" tooltip>
										{errors.category}
									</Form.Text>
								)}
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className="mb-3" controlId="descriptionInput">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							className="preserve-whitespace"
							rows={10}
							placeholder="Write a detailed description"
							name="description"
							value={data.description}
							isInvalid={errors.description}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{errors.description && (
							<Form.Text className="alert-danger" tooltip>
								{errors.description}
							</Form.Text>
						)}
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						onClick={(e) => doSubmit(e)}
						disabled={loading}>
						{loading ? "Please wait..." : "Submit"}
					</Button>
				</Form>
			</FormContainer>
		</Wrapper>
	);
};

export default CreateEditListing;
