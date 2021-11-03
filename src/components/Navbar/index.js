import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "./Navbar.styles";

import { FaBars } from "react-icons/fa";

// Hooks
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
	const [showLinks, setShowLinks] = useState(false);
	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);
	const auth = useAuth();
	const user = auth.user;

	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height;
		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight}px`;
		} else {
			linksContainerRef.current.style.height = `0px`;
		}
	}, [showLinks]);

	return (
		<Wrapper>
			<nav>
				<div className="nav-center">
					<div className="nav-header">
						<h1>eBid!</h1>
						<button
							className="nav-toggle"
							onClick={() => setShowLinks(!showLinks)}>
							<FaBars />
						</button>
					</div>
					<div className="links-container" ref={linksContainerRef}>
					{!user && <ul className="links" ref={linksRef}>
							<a href="/">
								<li>Searchbar</li>
							</a>

							<a href="/register">
								<li>Register</li>
							</a>
							<a href="/login">
								<li>Login</li>
							</a>
						</ul>}
					{user && <ul className="links" ref={linksRef}>
							<a href="/">
								<li>Searchbar</li>
							</a>
							<a href="/profile">
								<li>{user.username}</li>
							</a>
							<a href="/logout">
								<li>Logout</li>
							</a>
						</ul>}
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

export default Navbar;
