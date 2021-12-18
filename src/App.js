import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import AuctionDetail from "./components/AuctionDetail/index";
import CreateEditListing from "./components/CreateEditListing/";
import Profile from "./components/Profile";

// Custome Route component
import RequireAuth from "./components/common/RequireAuth";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./globalstyle";

// Hooks
import { createBrowserHistory } from "history";
import { ProvideAuth } from "./hooks/useAuth";

function App() {
	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<ProvideAuth>
				<Navbar />
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />

					<Route path="/" element={<Home />} />
					<Route path="/profile/:userName" element={<Profile />} />
					<Route path="/listings/:listingId" element={<AuctionDetail />} />
					<Route path="/listings/create" element={<CreateEditListing />} />
					<Route
						path="/listings/edit/:listingId"
						element={<CreateEditListing />}
					/>
					{/* <Route
						path="/home"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/> */}
				</Routes>
			</ProvideAuth>
			<GlobalStyle />
		</Router>
	);
}

export default App;
