import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useRef } from 'react';

export default function Login() {
	const navigate = useNavigate();
	const nameInputRef = useRef();
	const passInputRef = useRef();
	const UserRoles = [
		{
			username: 'admin',
			password: 'elastic',
			isLoggedIn: false
		},
		{
			username: 'analyst',
			password: 'elastic',
			isLoggedIn: false
		}
	];
	const formSubmitHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPassword = passInputRef.current.value;
		console.log('Username : ' + nameInputRef.current.value + ' Password: ' + passInputRef.current.value);
		UserRoles.map((e) => {
			if (enteredName === e.username && enteredPassword === e.password) {
				e.isLoggedIn = true;
			}
		});
		UserRoles.map((e) => {
			console.log(e);
		});
		UserRoles.map((e) => {
			if (e.isLoggedIn) {
				navigate(`/${e.username}`);
			}
		});
		if (!UserRoles[0].isLoggedIn && !UserRoles[1].isLoggedIn) {
			window.alert('enter correct password');
		}

		//window.alert('enter correct password');
	};

	return (
		<div className="body-login">
			<div className="body-login-align">
				<h2>Login</h2>
				<div>
					<form onSubmit={formSubmitHandler}>
						<p>Username :</p>
						<input ref={nameInputRef} type="text" id="username" />
						<p>Password :</p>
						<input ref={passInputRef} type="password" id="password" />
						<div className="Login-btn">
							<button>Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
