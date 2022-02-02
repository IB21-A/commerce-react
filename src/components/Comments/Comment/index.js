import React from 'react';
import moment from 'moment';

const Comment = ({comment}) => {
    console.log(comment);
  return <div>

      <h3>{comment.author}</h3>
      <p>
        {comment.body}
      </p>
      <p>
          {moment(comment.datetime).calendar()}
      </p>
  </div>;
};

export default Comment;
