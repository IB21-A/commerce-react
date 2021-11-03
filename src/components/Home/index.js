import React, { useState, useEffect } from "react";

// Styled Component
import { Wrapper } from "./Home.styles";
// Bootstrap Components

// Validation
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
	const auth = useAuth();
	const user = auth.user;

	return (
		<>
			<Wrapper>Welcome {user && user.username}!</Wrapper>
		</>
	);
};

export default Home;
