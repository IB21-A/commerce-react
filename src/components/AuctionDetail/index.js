import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";

// Assets
import noImage from "../../assets/no-image.gif";
// Styles
import {
	Wrapper,
	UpperSection,
	ThumbnailContainer,
	Thumbnail,
	BidContainer,
	BidBox,
	LowerSection,
} from "./AuctionDetail.styles";

// Hooks
import { useAuctionFetch } from "./../../hooks/useAuctionFetch";
import { useAuth } from "../../hooks/useAuth";

// Components
import Spinner from "../common/Spinner";
import { Form, InputGroup, Button } from "react-bootstrap";
import WatchlistToggle from "./../WatchlistToggle/Index";

// API
import API from "../../API";
import Comments from "../Comments/";

const AuctionDetail = () => {
	const { listingId } = useParams();
	const { state, loading, error } = useAuctionFetch(listingId);
	const auth = useAuth();
	const navigate = useNavigate();
	const [bidAmount, setBidAmount] = useState("");
	const [formError, setFormError] = useState("");
	const [isTopBidder, setIsTopBidder] = useState(false);
	const [bidType, setBidType] = useState("Starting Bid:");
	const [isUsersListing, setIsUsersListing] = useState(false);
	console.log(state);

	useEffect(() => {
		const userHasTopBid = async () => {
			const username = await API.getCurrentUsername();
			try {
				if (
					state.bids[0] &&
					state.bids[0].creator.toLowerCase() === username.toLowerCase()
				) {
					return setIsTopBidder(true);
				}
				return setIsTopBidder(false);
			} catch (error) {
				console.log(error);
			}
		};

		const updateBidType = async () => {
			if (state.num_of_bids >= 1) {
				if (state.is_active) {
					return setBidType("Current Bid:");
				}

				return setBidType("Closing Bid:");
			}
		};

		const userIsOwner = async () => {
			if (auth.user === null) return;

			return setIsUsersListing(auth.user.user_id === state.creator_id);
		};

		updateBidType();
		userHasTopBid();
		userIsOwner();
	}, [state, auth]);

	if (loading) {
		return (
			<Wrapper>
				<Spinner />
			</Wrapper>
		);
	} else if (error) {
		return <Wrapper>No such listing exists</Wrapper>;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (auth.user === null) {
			navigate(`/login/`);
		}
		setFormError("");
		const bid = await API.submitBid(listingId, bidAmount);
		// console.log(bid.data.bid_amount);
		console.log(bid);
		if (bid.status === 400) {
			setFormError(bid.data.bid_amount);
			return;
		}

		return window.location.reload();
		// console.log(bid);
	};

	const handleChange = ({ currentTarget: input }) => {
		setBidAmount(input.value);
	};

	return (
		<Wrapper>
			<UpperSection>
				<ThumbnailContainer>
					<Thumbnail src={state.image_url} />
				</ThumbnailContainer>
				<BidContainer>
					<h2 className="title">{state.title}</h2>
					<div className="two-columns space-between">
						<h6>
							listed by{" "}
							<Link to={`/profile/${state.creator}`}>{state.creator}</Link>
						</h6>
						<div>
							{state.is_active && isUsersListing && (
								<Link to={`/listings/edit/${listingId}`}>
									<Button variant="link">Edit this listing</Button>
								</Link>
							)}
						</div>
					</div>
					<hr />
					<BidBox>
						<div>
							{isTopBidder && (
								<div className="bg-warning px-2 py-1 mb-3">
									You are the current top bidder
								</div>
							)}
						</div>
						<Form className="two-columns space-between">
							<div className="two-columns space-between price-box">
								<div className="m-2">{bidType}</div>
								<div className="amount-column">
									<div className="bid-price">
										US ${state.current_bid_price.toFixed(2)}
									</div>
									{!isUsersListing && (
										<Form.Group className="mb-3" controlId="formBid">
											{/* <Form.Label>Bid Amount</Form.Label> */}
											<InputGroup>
												{/* <InputGroup.Text>$</InputGroup.Text> */}
												{/* TODO add 9 digit limit */}
												<Form.Control
													type="number"
													value={bidAmount}
													onChange={(e) => handleChange(e)}
													placeholder="Bid Amount"
													isInvalid={formError}
												/>
											</InputGroup>
											{formError && (
												<div className="alert-danger p-1">{formError}</div>
											)}

											<Form.Text className="text-muted">
												Enter bid amount. e.g. $
												{(state.current_bid_price + 0.01).toFixed(2)}
											</Form.Text>
										</Form.Group>
									)}
								</div>
							</div>
							<div className="button-column">
								<div className="bid-details">
									{state.num_of_bids} bid
									{(state.num_of_bids > 1 || state.num_of_bids === 0) &&
										"s"}{" "}
									with {state.num_of_unique_bids} bidder
									{(state.num_of_unique_bids > 1 ||
										state.num_of_unique_bids === 0) &&
										"s"}
								</div>
								{!isUsersListing && (
									<>
										<Button
											variant="primary"
											className="custom-rounded mt-2"
											type="submit"
											onClick={(e) => handleSubmit(e)}>
											Place Bid
										</Button>
										<WatchlistToggle
											variant="button"
											auctionId={listingId}
											isWatched={state.user_is_following}
											isAuthorized={auth.user}
										/>
									</>
								)}
							</div>
						</Form>
					</BidBox>
				</BidContainer>
			</UpperSection>
			<LowerSection className="preserve-whitespace">
				<hr />
				<p>{state.description}</p>
			</LowerSection>
			<Comments />
		</Wrapper>
	);
};

export default AuctionDetail;
