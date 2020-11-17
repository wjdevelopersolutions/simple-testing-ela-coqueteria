import axios from 'axios';
import swal from 'sweetalert';

const insertOne = (product) => {
	axios
		.post('/admin/add-product', { product }, { headers: {} })
		.then((response) => {
			swal({
				title: `${response.data.msg.toUpperCase()}`,
				text: response.data.Prod_Title,
				icon: 'success',
				buttons: {
					confirm: 'OK',
				},
			}).then(() => {
				window.location.href = '/';
			});
		})
		.catch((err) => {
			const errors = err.response.data.error;
			console.log(errors);
		});
};

const updateOne = (data) => {
	axios
		.post('/admin/add-product', data)
		.then((response) => {
			swal({
				title: `${response.data.msg.toUpperCase()}`,
				text: response.data.Prod_Title,
				icon: 'success',
				buttons: {
					confirm: 'OK',
				},
			}).then(() => {
				window.location.href = '/admin/products';
			});
		})
		.catch((err) => console.log(err.response));
};

export { insertOne, updateOne };
