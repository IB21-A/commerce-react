import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Wrapper, CommentHeader, CommentBody } from "./Comment.styles";

const Comment = ({ comment }) => {
  return (
    <Wrapper>
      <CommentHeader className="gap">
        <Link to={`/profile/${comment.author}`}>
          <h3 className="capitalize">{comment.author}</h3>
        </Link>{" "}
        <span className="date">
          {moment(comment.datetime).format("MMM Do YYYY, h:mm a")}
        </span>
      </CommentHeader>
      <CommentBody>
        <p>{comment.body}</p>
      </CommentBody>
    </Wrapper>
  );
};

export default Comment;
