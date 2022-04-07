import { useState } from "react";
import axios from "axios";
import Register from "./Register";

const flaskUrl = "https://taskbunnyapi.herokuapp.com";

export default function Login(props) {
	const [loginForm, setloginForm] = useState({
		email: "",
		password: "",
	});

	function userLogin(event) {
		axios({
			method: "POST",
			url: `${flaskUrl}/auth`,
			data: {
				email: loginForm.email,
				password: loginForm.password,
			},
		})
			.then((response) => {
				props.setToken(response.data.access_token);
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			});

		setloginForm({
			email: "",
			password: "",
		});

		event.preventDefault();
	}

	function handleChange(event) {
		const { value, name } = event.target;
		setloginForm((prevNote) => ({
			...prevNote,
			[name]: value,
		}));
	}

	return (
		<div>
			<h1>Login</h1>
			<form className='login'>
				<input
					onChange={handleChange}
					type='email'
					text={loginForm.email}
					name='email'
					placeholder='Email'
					value={loginForm.email}
				/>
				<input
					onChange={handleChange}
					type='password'
					text={loginForm.password}
					name='password'
					placeholder='Password'
					value={loginForm.password}
				/>

				<button onClick={userLogin}>Submit</button>
			</form>
			<br />
			<Register />
		</div>
	);
}
