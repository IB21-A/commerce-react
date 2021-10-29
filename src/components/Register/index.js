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
		repeatPassword: "",
	});
	const [error, setError] = useState({});

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
								<Form.Control type="email" placeholder="Enter email" />
							</FloatingLabel>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formUsername">
							<FloatingLabel
								controlId="floatingInput"
								label="Username"
								className="mb-3 text-muted">
								<Form.Control type="text" placeholder="Enter email" />
							</FloatingLabel>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<FloatingLabel
								controlId="floatingPassword"
								label="Password"
								className="mb-3 text-muted">
								<Form.Control type="password" placeholder="Password" />
							</FloatingLabel>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<FloatingLabel
								controlId="floatingRepeatPassword"
								label="Repeat Password"
								className="mb-3 text-muted">
								<Form.Control type="password" placeholder="Password" />
							</FloatingLabel>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</FormContainer>
			</Wrapper>
		</>
	);
};

export default Register;
