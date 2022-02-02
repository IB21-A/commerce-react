import React, {useState} from 'react';

// Styles
import { Wrapper } from './Comments.styles';

// Child components
import CommentForm from './CommentForm';
import Comment from './Comment';

const Comments = ({comments}) => {


  return <Wrapper>
      <h1>Comments</h1>
      {comments.length > 0 && comments.map((comment) => {
      return <Comment key={`comment-${comment.comment_id}`} comment={comment}/>
      })}
      <CommentForm/>
  </Wrapper>
};

export default Comments;