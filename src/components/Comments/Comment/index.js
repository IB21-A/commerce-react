import React from 'react';

const Comment = ({comment}) => {
    console.log(comment);
  return <div>

      <h3>{comment.author}</h3>
      <p>
        {comment.body}
      </p>
      <p>
          {comment.datetime}
      </p>
  </div>;
};

export default Comment;
