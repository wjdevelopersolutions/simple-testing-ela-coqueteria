import fancybox from './fancybox';

$(document).ready( () => {

  // DOM REFERFENCES
  const productCartImage = document.querySelector('#card-product-image');


  if (productCartImage) {
      productCartImage.addEventListener('click', () => {
          console.log('Tarjeta de producto');
      });
  }
  
  $('.fancybox').fancybox();

  
});


             