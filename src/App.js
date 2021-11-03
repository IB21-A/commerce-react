import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./globalstyle";

// Hooks
import { createBrowserHistory } from "history";

function App() {
	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<Navbar />
			<Routes>
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/login" element={<Login />} />
			</Routes>
			<GlobalStyle />
		</Router>
	);
}

export default App;
