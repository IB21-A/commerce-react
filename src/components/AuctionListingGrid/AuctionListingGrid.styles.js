import styled from "styled-components";

// Assets
import noImage from "../../assets/no-image.gif";

export const Wrapper = styled.div`
	margin-top: 0.5rem;
	padding: 0 0.5rem;
	width: auto;

	hr {
		width: 100%;
		margin: 1.5rem auto;
		opacity: 10%;
	}
`;

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
