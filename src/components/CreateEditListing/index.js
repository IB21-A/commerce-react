import React, { useState, useEffect } from "react";

// Styles
import { Wrapper, FormContainer, Thumbnail } from "./CreateEditListing.styles";
// Hooks
import { useAuctionFetch } from "./../../hooks/useAuctionFetch";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BasicModal from "../common/BasicModal";

import API from "../../API";

const CreateEditListing = () => {
	const { listingId } = useParams();
	const { state, error } = useAuctionFetch(listingId);
	const auth = useAuth();
	const [showModal, setShowModal] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [data, setData] = useState({
		title: "",
		description: "",
		category: "",
		start_bid: "",
		image_url: "",
	});
	const [editMode, setEditMode] = useState(false);
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
		permission: "",
	});
	const [loading, setLoading] = useState();

	useEffect(() => {
		const getCategories = async () => {
			const data = await API.getCategories();
			setCategories(data);
		};

		// if ListingId exists, then we'll set editmode and attempt to grab values and populate
		const isEditMode = async () => {
			if (!listingId) {
				return;
			}
			setEditMode(true);
			const newData = {
				title: state.title,
				description: state.description,
				category: state.category,
				start_bid: state.start_bid,
				image_url: state.image_url,
				is_active: state.is_active,
			};
			setData(newData);
		};

		const checkPermission = () => {
			if (auth.user === null) return;
			if (state.is_active && editMode && auth.user.user_id === state.creator_id) {
				return setHasPermission(true);
			}
			if (!editMode && auth.user !== null) {
				return setHasPermission(true);
			}
		};

		getCategories();
		isEditMode();
		checkPermission();
	}, [listingId, state, auth, editMode]);

	const handleChange = ({ currentTarget: input }) => {
		// console.log(data);
		let newData = { ...data };
		newData[input.name] = input.value;
		setData(newData);
		// console.log(newData);
		// console.log(newData.image_url instanceof File);
	};

	const handleImageChange = (e) => {
		let newData = { ...data };
		newData["image_url"] = e.target.files[0];
		setData(newData);
	};

	const doSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let listing;
		if (editMode) {
			listing = await API.editListing(listingId, data);
		} else {
			listing = await API.createListing(data);
		}

		if (listing.status === 400) {
			setErrors(listing.data);
		}

		return setLoading(false);
	};

	const handleCloseAuction = async (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	const handleConfirm = async () => {
		console.log("Confirming Close of auction %d", state.id);
		await API.closeListing(state.id);
	};

	if (!hasPermission) {
		return (
			<Wrapper>
				{!editMode && <p>You must be logged in to use this page.</p>}
				{editMode && (
					<p>
						You do not have permission to access this page. Make sure you are
						logged in and trying to access your own listing.
					</p>
				)}
			</Wrapper>
		);
	} else {
		return (
			<Wrapper className="max-width-margin">
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
									maxLength={40}
								/>
								{errors.title && (
									<Form.Text className="alert-danger" tooltip>
										{errors.title}
									</Form.Text>
								)}
							</Form.Group>
						</Row>
						<Row>
							<div className="two-columns">
								{editMode && data.image_url && (
									<Thumbnail src={data.image_url} />
								)}
								<Col>
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
								</Col>
							</div>
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
										disabled={editMode}
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
										disabled={editMode && data.category !== -1}
										value={data.category}
										onChange={(e) => {
											handleChange(e);
										}}>
										<option key={"select"} value={-1}>
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
						<div className="two-columns space-between">
							<Button
								variant="primary"
								type="submit"
								onClick={(e) => doSubmit(e)}
								disabled={loading}>
								{loading ? "Please wait..." : "Submit"}
							</Button>

							{editMode && (
								<Button
									variant="warning"
									type="submit"
									onClick={(e) => handleCloseAuction(e)}
									disabled={loading}>
									{loading ? "Please wait..." : "Close Auction"}
								</Button>
							)}
						</div>
					</Form>
				</FormContainer>
				<BasicModal
					showModal={showModal}
					setShowModal={setShowModal}
					handleConfirm={handleConfirm}
					title={"Are you sure you want to close this listing?"}
					body={
						"This action cannot be undone. Clicking 'Yes' will end this auction and determine a winner."
					}
					cancelButtonText={"Nevermind"}
					confirmButtonText={"Yes, I am sure"}
				/>
			</Wrapper>
		);
	}
};

export default CreateEditListing;
