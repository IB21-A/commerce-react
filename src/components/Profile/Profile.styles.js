import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  padding-inline: max(1rem, 3vw);
  margin: 0 auto;

  .datarow + .datarow {
    margin-top: max(3rem, 3vw);
  }
`;
