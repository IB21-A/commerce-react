import styled from "styled-components";
// Assets
import noImage from "../../assets/no-image.gif";

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	max-width: var(--maxWidth);

	/* Remove number picker arrows from number input */
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

export const ThumbnailContainer = styled.img.attrs((props) => ({
	src: props.src || noImage,
}))`
    flex-grow: .5;
	border: solid lightgray 1px;
	max-width: 300px;
	max-height: 300px;
	margin-right: 2rem;
	margin-bottom: 1rem;

	@media screen and (max-width: 600px) {
        max-width: 100%;
        max-height: 100%;
		width: auto;
		height: auto;
		margin-left: auto;
		margin-right: auto;
	}
`;

export const BidContainer = styled.div`
	flex-grow: 1;
	@media screen and (max-width: 600px) {
		.button-column {
			width: 100%;
		}

		.bid-details {
			text-align: center;
		}
	}
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
 
