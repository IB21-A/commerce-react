import React from "react";
import { Wrapper } from "./Navbar.styles";

import { FaBars } from "react-icons/fa";

const Navbar = () => {
	return (
		<Wrapper>
			<nav>
				<div className="nav-center">
					<div className="nav-header">
						<h1>Navbar</h1>
						<button className="nav-toggle">
							<FaBars />
						</button>
					</div>
					<div class="links-container">
						<ul className="links">
							<a href="#">
								<li>Home</li>
							</a>
							<a href="#">
								<li>About</li>
							</a>
							<a href="#">
								<li>Contact</li>
							</a>
						</ul>
					</div>
					<div class="links-container">
						<div class="links">
							<ul>
								<a href="/register">
									<li>Register / Login</li>
								</a>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

export default Navbar;
