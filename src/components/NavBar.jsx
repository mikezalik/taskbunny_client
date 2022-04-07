import axios from "axios";

const flaskUrl = "https://taskbunnyapi.herokuapp.com";

export default function Navbar(props) {
	function userLogOut() {
		axios({
			method: "POST",
			url: `${flaskUrl}/logout`,
		})
			.then((response) => {
				props.token();
			})

			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			});
	}

	return (
		<nav class='navbar navbar-dark bg-dark'>
			<div class='container-fluid'>
				<a class='navbar-brand' href='/'>
					Task Bunny &#128007;
				</a>
				<button onClick={userLogOut}>Logout</button>
			</div>
		</nav>
	);
}
