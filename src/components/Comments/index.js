import React, {useState} from 'react';

// Styles
import { Wrapper } from './Comments.styles';

// Child components
import CommentForm from './CommentForm';

const Comments = () => {
    const [data, setData] = useState();
    const loading = false;
    const errors = false;
    

  return <Wrapper>
      <h1>Comments</h1>
      <p>Comment 1</p>
      <p>Comment 2</p>
      <p>Comment 3</p>
      <CommentForm/>
  </Wrapper>
};

export default Comments;