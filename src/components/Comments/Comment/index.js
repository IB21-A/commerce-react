import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaRegComment } from "react-icons/fa";
import moment from "moment";
import {
  Wrapper,
  CommentHeader,
  CommentBody,
  CommentIcon,
} from "./Comment.styles";

const Comment = ({ comment, isOwner }) => {
  return (
    <Wrapper isOwner={isOwner}>
      <CommentHeader className="gap" style={{ "--gap": ".7rem" }}>
        <CommentIcon isOwner={isOwner}>
          {isOwner ? <FaCheckCircle /> : <FaRegComment />}
        </CommentIcon>
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
