import { useState } from "react";
import axios from "axios";

const flaskUrl = "https://taskbunnyapi.herokuapp.com";

export default function Register(props) {
	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
	});

	function registerUser(event) {
		axios({
			method: "POST",
			url: `${flaskUrl}/register`,
			data: {
				email: registerForm.email,
				password: registerForm.password,
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

		setRegisterForm({
			email: "",
			password: "",
		});

		event.preventDefault();
	}

	function handleChange(event) {
		const { value, name } = event.target;
		setRegisterForm((prevNote) => ({
			...prevNote,
			[name]: value,
		}));
	}

	return (
		<div>
			<h3>New User? Register Here</h3>
			<form className='login'>
				<input
					onChange={handleChange}
					type='email'
					text={registerForm.email}
					name='email'
					placeholder='Email'
					value={registerForm.email}
				/>
				<input
					onChange={handleChange}
					type='password'
					text={registerForm.password}
					name='password'
					placeholder='Password'
					value={registerForm.password}
				/>

				<button onClick={registerUser}>Submit</button>
			</form>
		</div>
	);
}
