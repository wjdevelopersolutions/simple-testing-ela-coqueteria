import { insertOne, updateOne } from './add-product-form-actions';
import axios from 'axios';
import swal from 'sweetalert';

const addProductForm = document.querySelector('#addProductForm');
const deleteCartBtn = document.querySelectorAll('#delete-cart');
const addToCartBtn = document.querySelectorAll('#add-to-cart');
const deleteProductBtn = document.querySelectorAll('#delete-product-btn');

if (addProductForm) {

    addProductForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const product = {
            Prod_Title: this.titulo.value,
            Prod_Price: this.precio.value,
            Prod_Images: this.imagenes.value.split(';'),
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

if(deleteCartBtn) {

    deleteCartBtn.forEach(button => {

        button.addEventListener('click', function(event) {

            event.preventDefault();
            const Prod_Id = this.dataset.product;
    
            swal({
                title: "Eliminar?",
                text: "Eliminar este producto del carrito de compras!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
    
                    axios.put('/cart', { Prod_Id })
                    .then(response => {
    
                        swal(response.data.msg, {
                            icon: "success",
                        })
                        .then(() => {
                            window.location.href = '/cart';
                        })
    
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
                    
                } else {
                  swal("El producto continua en tu lista de compras!");
                }
              });
    
        });
    })
}

if(deleteProductBtn) {

   deleteProductBtn.forEach(button => {

        button.addEventListener('click', function() {


            swal({
                title: "Eliminar?",
                text: "Seguro que deseas eliminar este producto?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
    
                    axios.delete('/products', {
                        params: {
                            'Prod_Id': `${this.dataset.product}`
                        }
                    })
                    .then(response => {
    
                        swal(response.data.msg.toUpperCase(), {
                            icon: "success",
                        })
                        .then(() => {
                            window.location.href = '/admin/products';
                        })
    
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
                    
                } else {
                  swal("El producto continua en tu lista de productos disponibles!");
                }
              });

           
        })
   })
}