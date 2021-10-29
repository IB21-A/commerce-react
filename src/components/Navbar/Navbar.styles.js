import styled from "styled-components";

export const Wrapper = styled.div`
	nav {
		background: #00abff;
		margin: 0 auto;
		box-shadow: 0 3px 7px grey;
	}

	.nav-center {
		max-width: 90vw;
		margin: 0 auto;
	}

	.nav-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
	}

	.nav-toggle {
		font-size: 1.5rem;
		color: white;
		background: transparent;
		border-color: transparent;
		transition: var(--transition);
		cursor: pointer;
	}

	.nav-toggle:hover {
		color: #0000ff;
		transform: rotate(90deg);
	}

	ul {
		list-style-type: none;
	}

	.links-container {
		height: 0;
		overflow: hidden;
		transition: var(--transition);
	}

	.links a {
		color: white;
		text-transform: capitalize;
		text-decoration: none;
		display: block;
		align-items: center;
		padding: 0 0.5rem 1.25rem;
		transition: var(--transition);
	}

	.links a:hover {
		color: #0000ff;
		background: hsl(205, 86%, 81%);
		padding-left: 1.5rem;
	}

	@media screen and (min-width: 800px) {
		.nav-center {
			max-width: var(--maxWidth);
			margin: 0 auto;
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			padding: 1em;
		}

		.nav-toggle {
			display: none;
		}

		.links-container {
			height: auto !important;
		}

		.links {
			display: flex;
		}

		.links a {
			padding: 0;
			margin: 0 1rem;
		}
		.links a:hover {
			padding: 0;
			margin: 0 1rem;
			background: none;
		}
	}
`;
