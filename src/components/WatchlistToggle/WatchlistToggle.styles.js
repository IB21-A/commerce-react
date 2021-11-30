import styled from "styled-components";

export const HeartContainer = styled.div`
	border: 1px solid;
	border-color: var(--medLightGrey);
	height: 2.2rem;
	width: 2.2rem;
	border-radius: 100%;
	text-align: center;

	color: var(--medLightGrey);
	font-size: 1.4rem;
	transition: var(--transition);

	margin-top: auto;
	margin-left: auto;
	text-align: center;
	white-space: nowrap;
	flex-shrink: 0;

	:hover {
		border: 1px solid;
		border-color: var(--primary);
		color: var(--primary);
		box-shadow: 1px 1px 3px;
		transition: var(--transition);
	}

	.active {
		color: red;

		transition: var(--transition);
	}
`;

export const WatchButton = styled.div`
	.icon {
		color: yellow;
		font-size: 1.1rem;
		margin-bottom: 0.2rem;

		${"" /* transition: var(--transition); */}
	}
`;
