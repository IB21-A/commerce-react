import styled from "styled-components";

export const Wrapper = styled.div`
	border: 1px solid;
	border-color: var(--medLightGrey);
	height: 2.2rem;
	width: 2.2rem;
	border-radius: 100%;
	text-align: center;

	color: var(--medLightGrey);
	font-size: 1.4rem;
	transition: var(--transition);

	:hover {
		border: 1px solid;
		border-color: var(--primary);
		color: var(--primary);
		box-shadow: 1px 1px 3px;
		transition: var(--transition);
	}

	.active {
		color: red;
	}
`;
