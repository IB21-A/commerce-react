import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	max-width: var(--maxWidth);

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
`;

export const ThumbnailContainer = styled.img`
	border: solid lightgray 1px;
	width: 250px;
	height: 250px;
`;
