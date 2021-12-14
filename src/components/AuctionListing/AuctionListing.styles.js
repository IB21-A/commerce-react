import styled from "styled-components";

// Assets
import noImage from "../../assets/no-image.gif";

export const Wrapper = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	width: auto;

	hr {
		width: 100%;
		margin: 0.5rem auto;
		opacity: 10%;
	}
`;

export const Container = styled.div`
	display: flex;
`;
export const ListingDetails = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
	flex-grow: 1;
`;

export const Title = styled.div`
	font-size: 1.4rem;
	font-weight: 500;
`;

export const Price = styled.div`
	font-size: 1.8rem;
	font-weight: 500;
`;
export const Description = styled.div``;

export const ThumbnailContainer = styled.div``;

export const Thumbnail = styled.img.attrs((props) => ({
	src: props.src || noImage,
}))`
	border: solid lightgray 1px;
	object-fit: contain;
	width: 250px;
	height: 250px;
`;

Thumbnail.defaultProps = {
	src: noImage,
};

