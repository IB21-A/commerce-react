import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../API";

import Spinner from "../common/Spinner";

// Styled Component
import { FormContainer, Wrapper } from "./Login.styles";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Validation
import Joi from "joi";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
	const [data, setData] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const auth = useAuth();
	const navigate = useNavigate();

	const schema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string()
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
			validated.error.details.map((item) => {
				newErrors[item.path] = item.message;
			});
			setErrors(newErrors);
			return;
		}

		return;
	};

	const attemptLogin = async () => {
		console.log("attempt login data:", data);
		try {
			setLoading(true);
			const user = await auth.login(data);
			let newErrors = {};
			console.log(user);
			if (user.detail) {
				newErrors.login_error = user.detail;
				setErrors(newErrors);
			}
			setLoading(false);
			if (user.username) {
				return true;
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};

	const doSubmit = async (e) => {
		e.preventDefault();
		await validate();
		const loggedIn = await attemptLogin();
		if (loggedIn) {
			navigate("/");
		}
	};

	return (
		<>
			<Wrapper>
				<FormContainer>
					<h1>Login</h1>
					<Form>
						{errors.login_error && (
							<div className="alert alert-danger">{errors.login_error}</div>
						)}
						<Form.Group className="mb-3" controlId="formUsername">
							<FloatingLabel
								controlId="floatingInput"
								label="Username"
								className="mb-3 text-muted">
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
								className="mb-3 text-muted">
								<Form.Control
									name="password"
									value={data.password}
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
							disabled={loading}>
							{loading ? "Logging in..." : "Submit"}
						</Button>
					</Form>
				</FormContainer>
			</Wrapper>
		</>
	);
};

export default Login;
