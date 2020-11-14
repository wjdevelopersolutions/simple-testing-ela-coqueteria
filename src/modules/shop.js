import axios from 'axios';
import swal from 'sweetalert';

const productAggregeBtn = document.querySelector('#create-product-form');

const formTitulo = document.querySelector('#form-titulo');
const formPrecio = document.querySelector('#form-precio');
const formImagenes = document.querySelector('#form-imagenes');
const formDescripcion = document.querySelector('#form-descripcion');




if (productAggregeBtn) {

    formPrecio.addEventListener('keypress', function(event) {
        this.classList.remove('is-invalid');
    })


    productAggregeBtn.addEventListener('submit', event => {

        event.preventDefault();

        const producto = {
            
                Prod_Title: event.target.titulo.value,
                Prod_Price: event.target.precio.value,
                Prod_Images: event.target.imagenes.value.split(';'),
                Prod_Videos: [],
                Prod_Description: event.target.descripcion.value
        };

        
        axios.post('http://localhost:3000/api/v1/product', producto)
            .then(response => response)
            .then(data => {
                console.log(data);
                swal("Producto creado!", `${data.data.producto.Prod_Title}`, "success")
                    .then(() => {
                        window.location.href = '/'
                    })
            })
            .catch(err => {

                const errors = err.response.data.errors;
                
                for(let i = 0; i <= errors.length; i++) {

                    switch (`${errors[i].param}`) {
                        case 'Prod_Title':
                            formTitulo.classList.add('is-invalid')
                            break;
                        case 'Prod_Price':
                            formPrecio.classList.add('is-invalid')
                            break;
                        case 'Prod_Images':
                            formImagenes.classList.add('is-invalid')
                            break;
                        case 'Prod_Description':
                            formDescripcion.classList.add('is-invalid')
                            break;
                    
                        default:
                            break;
                    }
                }
                // formTitulo.classList.add('is-invalid');
                console.log(errors);
            });

    })

}