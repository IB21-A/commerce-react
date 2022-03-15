import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../API";

// Styles
import { Wrapper, CommentSpace } from "./Comments.styles";
// Components
import Spinner from "../common/Spinner";
// Child components
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({
  comments: commentData,
  listingId,
  listingOwnerId,
  isAuthorized,
}) => {
  const [comments, setComments] = useState(commentData);

  const updateComments = async (newComment) => {
    console.log(comments);
    const newComments = [...comments, newComment];
    setComments(newComments);
  };

  return (
    <Wrapper>
      <h1>Comments</h1>
      <CommentSpace>
        {comments.length > 0 &&
          comments.map((comment) => {
            const isOwner = comment.author_id === listingOwnerId;
            return (
              <Comment
                key={`comment-${comment.comment_id}`}
                comment={comment}
                isOwner={isOwner}
                className="comment"
              />
            );
          })}
      </CommentSpace>
      {isAuthorized && (
        <CommentForm listingId={listingId} updateComments={updateComments} />
      )}
      {!isAuthorized && (
        <div>
          <Link to={`/login`} className="my-2">
            Sign in
          </Link>{" "}
          to post a question or comment
        </div>
      )}
    </Wrapper>
  );
};

export default Comments;
