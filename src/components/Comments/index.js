import React, { useState } from "react";
import API from "../../API";

// Styles
import { Wrapper } from "./Comments.styles";
// Components
import Spinner from "../common/Spinner";
// Child components
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ comments: commentData, listingId }) => {
  const [comments, setComments] = useState(commentData);

  const updateComments = async (newComment) => {
    console.log(comments);
    const newComments = [...comments, newComment];
    setComments(newComments);
  };

  return (
    <Wrapper>
      <h1>Comments</h1>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <Comment key={`comment-${comment.comment_id}`} comment={comment} />
          );
        })}
      <CommentForm listingId={listingId} updateComments={updateComments} />
    </Wrapper>
  );
};

export default Comments;
