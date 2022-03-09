import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Styles
import { Wrapper } from "./CommentForm.styles";

import API from "../../../API";

const CommentForm = () => {
  const [data, setData] = useState({ comment: "" });
  const loading = false;
  const errors = false;

  const handleChange = ({ currentTarget: input }) => {
    let newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const doSubmit = (e) => {
    e.preventDefault();
    if (data.comment !== "") {
      // We need to get the ID of the listing to submit with this
      API.submitComment(1, data.comment);
    }
  };

  return (
    <Wrapper>
      <Form>
        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label>Add a Comment or Question</Form.Label>
          <Form.Control
            as="textarea"
            className="preserve-whitespace"
            rows={3}
            placeholder="Write it here"
            name="comment"
            value={data.comment}
            isInvalid={errors}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.description && (
            <Form.Text className="alert-danger" tooltip>
              {errors}
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => doSubmit(e)}
          disabled={loading || data.comment === ""}
        >
          {loading ? "Please wait..." : "Submit"}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default CommentForm;
