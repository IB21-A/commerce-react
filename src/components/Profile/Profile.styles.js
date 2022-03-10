import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;

  .datarow + .datarow {
    margin-top: max(3rem, 3vw);
  }
`;
