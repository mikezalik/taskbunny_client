import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import useToken from "./utilities/useToken";

import "./App.css";

function App() {
	const { token, removeToken, setToken } = useToken();

	return (
		<div>
			<BrowserRouter>
				<Navbar token={removeToken} />

				{!token && token !== "" && token !== undefined ? (
					<Login path={"/login"} setToken={setToken} />
				) : (
					<>
						<Routes>
							<Route
								path={"/"}
								element={<HomePage setToken={setToken} token={token} />}
							/>
						</Routes>
					</>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
