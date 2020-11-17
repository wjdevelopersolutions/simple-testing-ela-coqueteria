import axios from 'axios';
import Swal from 'sweetalert';
import User from '../class/User';

const postLoginBtn = document.querySelector('#post-login-btn');
const postLogOutBtn = document.querySelector('#log-out-btn');
const signupForm = document.querySelector('#signup-form');

// if (postLoginBtn) {
// 	postLoginBtn.addEventListener('click', () => {
// 		fetch('http://localhost:3000/api/v1/auth/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		})
// 			.then((res) => {
// 				console.log(res);
// 				return res.json();
// 			})
// 			.catch((err) => console.log(err))
// 			.then((response) => {
// 				console.log(response);
// 			});
// 	});
// }

// if (postLogOutBtn) {
// 	postLogOutBtn.addEventListener('click', () => {
// 		fetch('http://localhost:3000/api/v1/auth/logout', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		})
// 			.then((res) => {
// 				console.log(res);
// 				return res.json();
// 			})
// 			.catch((err) => console.log(err))
// 			.then((response) => {
// 				console.log(response);
// 			});
// 	});
// }

console.log('Session');

if (signupForm) {
	signupForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const user = new User(
			this.name.value,
			this.email.value,
			this.password.value,
			this.confirmPassword.value
		);

		axios
			.post('/signup', { user })
			.then((response) => {
				swal({
					title: `${response.data.msg.toUpperCase()}`,
					// text: response.data.Prod_Title,
					icon: 'success',
					buttons: {
						confirm: 'OK',
					},
				}).then(() => {
					window.location.href = '/login';
				});
			})
			.catch((err) => {
				console.log(err.response);
			});
	});
}
