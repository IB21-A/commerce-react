import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	max-width: var(--maxWidth);
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

	@media screen and (min-width: 800px) {
		max-width: 60%;
	}
`;
