import { insertOne, updateOne } from './add-product-form-actions';
import axios from 'axios';
import swal from 'sweetalert';

const addProductForm = document.querySelector('#addProductForm');
const addToCartBtn = document.querySelectorAll('#add-to-cart');

if (addProductForm) {

    addProductForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const product = {
            Prod_Title: this.titulo.value,
            Prod_Price: this.precio.value,
            Prod_Images: this.imagenes.value,
            Prod_Videos: [],
            Prod_Description: this.descripcion.value
        }
        
        const action = event.target.action.value;

        const urlParams = new URL(window.location.href);
        const urlSearchParams = urlParams.searchParams;

        const item = urlSearchParams.get('item');
        const edit = urlSearchParams.get('edit');

        switch (action) {
            case 'create':
                insertOne(product)
                break;
            case 'update':
                updateOne({ item, edit, product });
            default:
                break;
        };

    });

}


if(addToCartBtn) {

    addToCartBtn.forEach( button => {

        button.addEventListener('click', function(e) {

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

    });

}