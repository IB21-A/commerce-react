import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "./Navbar.styles";

import { FaBars } from "react-icons/fa";

const Navbar = () => {
	const [showLinks, setShowLinks] = useState(false);
	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);

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
						<ul className="links" ref={linksRef}>
							<a href="#">
								<li>Home</li>
							</a>
							<a href="#">
								<li>About</li>
							</a>
							<a href="#">
								<li>Contact</li>
							</a>

							<a href="/register">
								<li>Register / Login</li>
							</a>
						</ul>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

export default Navbar;
