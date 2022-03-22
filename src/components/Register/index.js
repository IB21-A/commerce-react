import React, { useState } from "react";

import API from "../../API";
// Custom Hook
import { useAuth } from "../../hooks/useAuth";

// Styled Component
import { FormContainer, Wrapper } from "./Register.styles";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Validation
import Joi from "joi";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    username: "",
    first_name: "Test",
    last_name: "Test",
    password: "",
    password_repeat: "",
  });
  const [errors, setErrors] = useState({});
  const auth = useAuth();

  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    username: Joi.string().alphanum().min(3).max(30).required(),
    first_name: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,30}$")).required(),
    last_name: Joi.string().pattern(new RegExp("^[a-zA-Z]{1,30}$")).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    // password_repeat: Joi.ref("password"),
    password_repeat: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const handleChange = ({ currentTarget: input }) => {
    let newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const validate = async () => {
    setErrors({});
    const options = { abortEarly: false };
    const validated = schema.validate(data, options);
    let newErrors = {};
    if (validated.error) {
      validated.error.details.forEach((item) => {
        newErrors[item.path] = item.message;
      });
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const attemptRegister = async () => {
    let newErrors = {};
    const result = await API.register(data);
    if (result.status === 201) {
      await auth.login(data);
      return;
    }

    console.log(result);
    newErrors = result;
    setErrors(newErrors);
    return;
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    const validated = await validate();
    if (!validated) return;

    await attemptRegister();
  };

  return (
    <>
      <Wrapper>
        <FormContainer>
          <h1>Register</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3 text-muted"
              >
                <Form.Control
                  name="email"
                  type="email"
                  value={data.email}
                  placeholder="Enter email"
                  onChange={(e) => handleChange(e)}
                />
              </FloatingLabel>
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3 text-muted"
              >
                <Form.Control
                  name="username"
                  value={data.username}
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => handleChange(e)}
                />
              </FloatingLabel>
              {errors.username && (
                <div className="alert alert-danger">{errors.username}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3 text-muted"
              >
                <Form.Control
                  name="password"
                  value={data.password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingRepeatPassword"
                label="Repeat Password"
                className="mb-3 text-muted"
              >
                <Form.Control
                  name="password_repeat"
                  value={data.password_repeat}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
              </FloatingLabel>
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => doSubmit(e)}
            >
              Submit
            </Button>
          </Form>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default Register;
