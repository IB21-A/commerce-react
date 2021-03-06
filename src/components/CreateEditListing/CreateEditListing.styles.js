import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	max-width: var(--maxWidth);

	/* Remove number picker arrows from number input */
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
`;

export const FormContainer = styled.div`
	border: 1px grey solid;
	border-radius: 5px;
	box-shadow: 3px 3px 7px grey;
	padding: 1rem;
	margin: 3rem auto;

	h1 {
		padding-bottom: 1rem;
	}
`;

export const Thumbnail = styled.img.attrs((props) => ({
	src: props.src,
}))`
	border: solid lightgray 1px;
	object-fit: contain;
	width: 250px;
	height: 250px;
	margin-bottom: 1rem;
	margin-right: 1rem;
`;

Thumbnail.defaultProps = {
	src: "",
};