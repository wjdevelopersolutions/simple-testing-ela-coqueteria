import axios from 'axios';
import swal from 'sweetalert';

const productAggregeBtn = document.querySelector('#create-product-form');
const addToCartBtn = document.querySelectorAll('#add-to-cart');

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

        
        axios.post('/admin/add-product', producto)
            .then(response => response)
            .then(data => {
                console.log(data);
                swal("Producto creado!", `${data.data.product.Prod_Title}`, "success")
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


if(addToCartBtn) {

    for(let i = 0; i <= addToCartBtn.length; i++) {

        addToCartBtn[i].addEventListener('click', function(e) {

            e.preventDefault();
            const data = {Prod_Slug_Url: this.dataset.product};

            axios.post('/cart', data)
                .then(res => {

                    if( res.status == 200 ) {
                        swal({
                                title: "Agregado al carrito!", 
                                text: `${res.data.Prod_Title}`, 
                                icon: "success",
                                buttons: {
                                    confirm: 'Ir al carrito'
                                }
                            })
                            .then(() => {
                                window.location.href = '/cart'
                            })
                    }
                })
                .catch(err => {
                    swal ({
                        title: "Algo salio mal!", 
                        text: `Error al agregar el articulo al carrito`, 
                        icon: "error",
                        buttons: {
                            cancel: 'Cerrar'
                        }
                    })
                    console.log(err.response.data);
                    throw new Error(`Error al agregar el articulo al carrito: ${err}`);
                })
    
        });

    }

}