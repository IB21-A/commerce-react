import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	max-width: var(--maxWidth);

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}

	.custom-rounded {
		width: 100% !important;
		border-radius: 25px !important;
	}

	.bid-price {
		font-size: 2rem;
		font-weight: bold;
	}

	.price-box {
		min-width: 300px;
	}
`;

export const UpperSection = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const ThumbnailContainer = styled.img`
	border: solid lightgray 1px;
	max-width: 500px;
	max-height: 500px;
	margin-right: 2rem;

	@media screen and (max-width: 600px) {
		.button-column {
			width: 100%;
		}

		.bid-details {
			text-align: center;
		}
	}
`;

export const BidContainer = styled.div`
	flex-grow: 1;
`;

export const BidBox = styled.div`
	display: flex;
	flex-direction: column;

	.amount-column {
		margin-right: 2rem;
	}

	.button-column {
		min-width: 244px;
	}

	@media screen and (max-width: 600px) {
		.button-column {
			width: 100%;
		}

		.bid-details {
			text-align: center;
		}
	}
`;

export const LowerSection = styled.div``;
 
