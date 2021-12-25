import styled from "styled-components";

// Assets
import noImage from "../../assets/no-image.gif";

export const Wrapper = styled.div`
	max-width: 225px;
	max-height: 275px;
	border: solid lightgray 1px;
	background-color: white;
`;

export const InfoContainer = styled.div`
	border-top: solid lightgray 1px;
	padding: 0 0.5rem;
	line-height: 1.5rem;
`;
export const Title = styled.div`
	white-space: nowrap;
	width: 75%;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const Price = styled.div``;

export const ThumbnailContainer = styled.div`
	width: 100%;
	padding-bottom: 100%;
	position: relative;
`;

export const Thumbnail = styled.img.attrs((props) => ({
	src: props.src || noImage,
}))`
	object-fit: contain;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	max-width: 100%;
	max-height: 100%;
`;

Thumbnail.defaultProps = {
	src: noImage,
};
