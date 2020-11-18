import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import User from '../class/User';


/**
 * Csurf npm
 */
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


((c) => {
	
	const signupForm = document.querySelector('#signup-form');
	const loginForm = document.querySelector('#login-form');
	const logoutBtn = document.querySelector('#logout-btn');
	const resetPassword = document.querySelector('#reset-password');
	const newPassword = document.querySelector('#new-password-form');
	



	if(loginForm) {
		loginForm.addEventListener('submit', function(event) {

			event.preventDefault();
			const user = {
				Usr_Email: this.email.value,
				Usr_Password: this.password.value
			}
			
			// POST /login
			axios
				.post('/login', { user }, {
					headers: {
						'CSRF-Token': token
					}
				})
				.then((response) => {

					swal({
						title: "Inicio exitoso!",
						text: 'Reedireccionando a la pagina de inicio',
						icon: "success",
						buttons: false
					  })
					  
					  setTimeout(() => {
						window.location.href = '/';
					  }, 1000)
				})
				.catch(err => {
					if(err.response.status === 404) {
						return toastr.error(err.response.data.msg, 'Ops!')
					}
					toastr.warning(err.response.data.error.msg)
					console.log(err.response);
				})
		})
	}

	if (signupForm) {
		signupForm.addEventListener('submit', function (event) {
			event.preventDefault();
	
			const user = new User(
				this.name.value,
				this.email.value,
				this.password.value,
				// this.confirmPassword.value
			);
	
			axios
				.post('/signup', { user },{
					headers: {
						'CSRF-Token': token
					}
				})
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

	if(logoutBtn) {

		logoutBtn.addEventListener('click', (event) => {

			event.preventDefault();

			swal({
				title: "Cerrar sesion?",
				text: "Seguro que deseas salir?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			  })
			  .then((willDelete) => {
				if (willDelete) {

					axios
						.post('/logout', {}, {
							headers: {
								'CSRF-Token': token
							}
						})
						.then(response => {
							swal(response.data.msg.toUpperCase(), {
								icon: "success",
							})
							.then(() => {
								window.location.href = "/"
							});
						})
				} else {
				  swal("De acuerdo, continua navegando seguro!");
				}
			  });

		});
	}

	if(resetPassword) {

		resetPassword.addEventListener('submit', function(event){
			event.preventDefault();
			console.log("Reseteando la contrasena");

			axios.post('http://localhost:4000/reset', { Usr_Email: this.Usr_Email.value }, {
				headers: {
					'CSRF-Token': token
				}
			}).then(response => {
				return Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: response.data.msg,
					showConfirmButton: false,
					timer: 1500
				  })
			})
			.then(result => {
				window.location.href = '/login';
			})
			.catch(err => {
				console.log(err);
			})
		});
	}

	if(newPassword) {
		newPassword.addEventListener('submit', function(event){
			event.preventDefault();
			console.log("nueva contrasena");

			axios.post(`http://localhost:4000/reset/${this.CRYPTO_Token.value}`, { 
				Usr_Password: this.Usr_Password.value, 
				Usr_Id: this.Usr_Id.value,
				CRYPTO_Token: this.CRYPTO_Token.value
			 }, {
				headers: {
					'CSRF-Token': token
				}
			})
			.then(response => {
				return Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: response.data.msg,
					showConfirmButton: false,
					timer: 1500
				  })
			})
			.then(result => {
				window.location.href = '/login'
			})
			.catch(err => console.log(err.response))
		});
	}
	

})(console.log)

