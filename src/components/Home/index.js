import React, { useState, useEffect } from "react";



// Styled Component
import { Wrapper } from "./Home.styles";
// Bootstrap Components

// Validation
import { useAuth } from "../../hooks/useAuth";
import { useHomeFetch } from './../../hooks/useHomeFetch';

//components
import Spinner from '../common/Spinner';

const Home = () => {
	const auth = useAuth();
	const user = auth.user;
	const {state, loading, error} = useHomeFetch();

	if (error) return <Wrapper>Uh oh! Something went wrong!</Wrapper>

	return (
		<>
			<Wrapper>Welcome {user && user.username}!</Wrapper>
			{state.results.map((auction)=>(
				<div key={auction.id}>
					Title: {auction.title}
					<p>Description:{auction.description}</p>
				</div>
			))}
			{loading && <Spinner/>}
		</>
	);
};

export default Home;
