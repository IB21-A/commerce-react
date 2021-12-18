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
	gap: 1rem;
`;

export const Thumbnail = styled.img.attrs((props) => ({
	src: props.src || noImage,
}))`
	border: solid lightgray 1px;
	object-fit: contain;
	width: 100%;
	height: 100%;
`;

export const ThumbnailContainer = styled.div`
	flex-grow: 1;
	max-width: 400px;
	max-height: 400px;
	margin-left: auto;
	margin-right: auto;

	@media screen and (max-width: 768px) {
		max-width: 100vw;
		max-height: 50vw;
	}
`;

export const BidContainer = styled.div`
	overflow-wrap: anywhere;
	${"" /* flex-grow: 0.5; */}

	@media screen and (max-width: 768px) {
		.button-column {
			width: 100%;
		}

		.bid-details {
			text-align: center;
		}

		.title {
			max-width: 100%;
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
 
