import Navbar from "./components/NavBar";
import Quotes from "./components/Quotes";
import Tasks from "./components/Tasks";
import "./App.css";

function App() {
	return (
		<div>
			<Navbar />
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<Tasks />
					</div>
					<div class='col'>
						<Quotes />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
