import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  padding: 1rem max(1rem, 3vw) 1rem;
  margin: 0 auto;

  .star {
    color: #f4c430;
    padding-bottom: 5px;
  }

  .datarow + .datarow {
    margin-top: max(3rem, 3vw);
    margin-bottom: max(3rem, 3vw);
  }
`;
