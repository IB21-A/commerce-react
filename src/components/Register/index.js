import React, { useState, useEffect } from "react";
// Styled Component
import { FormContainer, Wrapper } from "./Register.styles";
// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Register = () => {
	const [data, setData] = useState({
		email: "",
		username: "",
		password: "",
		password_repeat: "",
	});
	const [error, setError] = useState({});

	const handleChange = ({ currentTarget: input }) => {
		let newData = { ...data };
		newData[input.name] = input.value;
		setData(newData);
	};

	const doSubmit = (e) => {
		e.preventDefault();
		console.log(data);
	};

	return (
		<>
			<Wrapper>
				<FormContainer>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<FloatingLabel
								controlId="floatingInput"
								label="Email address"
								className="mb-3 text-muted">
								<Form.Control
									name="email"
									type="email"
									value={data.email}
									placeholder="Enter email"
									onChange={(e) => handleChange(e)}
								/>
							</FloatingLabel>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formUsername">
							<FloatingLabel
								controlId="floatingInput"
								label="Username"
								className="mb-3 text-muted">
								<Form.Control
									name="username"
									value={data.username}
									type="text"
									placeholder="Enter email"
									onChange={(e) => handleChange(e)}
								/>
							</FloatingLabel>
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
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<FloatingLabel
								controlId="floatingRepeatPassword"
								label="Repeat Password"
								className="mb-3 text-muted">
								<Form.Control
									name="password_repeat"
									value={data.password_repeat}
									type="password"
									placeholder="Password"
									onChange={(e) => handleChange(e)}
								/>
							</FloatingLabel>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							onClick={(e) => doSubmit(e)}>
							Submit
						</Button>
					</Form>
				</FormContainer>
			</Wrapper>
		</>
	);
};

export default Register;
