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
import { ProvideAuth } from "./hooks/useAuth";

function App() {
	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<ProvideAuth>
				<Navbar />
				<Routes>
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</ProvideAuth>
			<GlobalStyle />
		</Router>
	);
}

export default App;
