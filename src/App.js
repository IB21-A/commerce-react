import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyle } from "./globalstyle";

function App() {
	return (
		<>
			<Navbar />
			<Register />
			<GlobalStyle />
		</>
	);
}

export default App;
