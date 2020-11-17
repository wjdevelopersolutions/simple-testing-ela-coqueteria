import axios from 'axios';
import swal from 'sweetalert';
import User from '../class/User';


/**
 * Csurf npm
 */
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


((c) => {
	
	const signupForm = document.querySelector('#signup-form');
	const loginForm = document.querySelector('#login-form');
	const logoutBtn = document.querySelector('#logout-btn');
	const loginErrorMsg = $('#login-error-msg');



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
					c(err.response.data)
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
	

})(console.log)

