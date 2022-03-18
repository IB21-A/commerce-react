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

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

Thumbnail.defaultProps = {
  src: noImage,
};

export const ListingDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  flex-grow: 1;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    width: 90%;
    max-width: 100%;
  }
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
