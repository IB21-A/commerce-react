import styled from "styled-components";

export const Wrapper = styled.div`
  & ~ & {
    margin-top: min(0.5rem, 1vw);
  }
  padding: 1rem;
  border: solid 2px
    ${(props) => (props.isOwner ? "var(--primary)" : "var(--medLightGrey)")};
  background: white;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: baseline;
`;
export const CommentBody = styled.div``;

export const CommentIcon = styled.div`
  img,
  svg {
    vertical-align: baseline;
  }

  color: ${(props) =>
    props.isOwner ? "var(--primary)" : "var(--medLightGrey)"};
  font-size: 1.5rem;
`;
