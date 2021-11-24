import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

// Assets
import noImage from "../../assets/no-image.gif";
// Styles
import { Wrapper, ThumbnailContainer } from "./AuctionDetail.styles";
// Hooks
import { useAuctionFetch } from "./../../hooks/useAuctionFetch";
// Components
import Spinner from "../common/Spinner";
import { Form, InputGroup, Button } from "react-bootstrap";
import API from "../../API";

const AuctionDetail = () => {
	const { listingId } = useParams();
	const [bidAmount, setBidAmount] = useState("");
	const [formError, setFormError] = useState("");
	const [isTopBidder, setIsTopBidder] = useState(false);
	const { state, loading, error } = useAuctionFetch(listingId);
	const navigate = useNavigate();

	useEffect(() => {
		const UserHasTopBid = async () => {
			const username = await API.getCurrentUsername();
			console.log(username);
			if (
				state.bids[0] &&
				state.bids[0].creator.toLowerCase() === username.toLowerCase()
			) {
				console.log(state.bids[0].creator.toLowerCase());
				return setIsTopBidder(true);
			}
			return setIsTopBidder(false);
		};
		UserHasTopBid();
	}, [state]);

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
			<h1>{state.title}</h1>
			<h6>listed by {state.creator}</h6>
			<ThumbnailContainer src={noImage} />
			<div>${state.current_bid_price.toFixed(2)}</div>
			<div>
				{state.num_of_bids} bid{state.num_of_bids > 1 && "s"} with{" "}
				{state.num_of_unique_bids} bidder{state.num_of_unique_bids > 1 && "s"}
			</div>
			{isTopBidder && <div>You are the current top bidder</div>}
			<p>{state.description}</p>
			<Form>
				<Form.Group className="mb-3" controlId="formBid">
					<Form.Label>Bid Amount</Form.Label>
					<InputGroup>
						<InputGroup.Text>$</InputGroup.Text>
						{/* TODO add 9 digit limit */}
						<Form.Control
							type="number"
							value={bidAmount}
							onChange={(e) => handleChange(e)}
						/>
					</InputGroup>
					{formError && <div className="alert alert-danger">{formError}</div>}
					<Form.Text className="text-muted">
						Enter bid amount. e.g. $
						{(state.current_bid_price + 0.01).toFixed(2)}
					</Form.Text>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					onClick={(e) => handleSubmit(e)}>
					Submit Bid
				</Button>
			</Form>
		</Wrapper>
	);
};

export default AuctionDetail;
