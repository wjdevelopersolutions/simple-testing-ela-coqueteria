function productZoom(){

    $(".product-zoom").elevateZoom({
      gallery: 'ProductThumbs',
      galleryActiveClass: "active",
      zoomType: "inner",
      cursor: "crosshair"
    });$(".product-zoom").on("click", function(e) {
      var ez = $('.product-zoom').data('elevateZoom');
      $.fancybox(ez.getGalleryList());
      return false;
    });
    
};

function productZoomDisable(){

    if( $(window).width() < 767 ) {
        $('.zoomContainer').remove();
        $(".product-zoom").removeData('elevateZoom');
        $(".product-zoom").removeData('zoomImage');
    } else {
        productZoom();
    }

};
  
productZoomDisable();

$(window).resize(function() {

    productZoomDisable();

});

$('.product-thumbnail').owlCarousel({
    loop: true,
    center: true,
    nav: true,dots:false,
    margin:10,
    autoplay: false,
    autoplayTimeout: 5000,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    item: 3,
    responsive: {
      0: {
          items: 2
      },
      480: {
          items: 3
      },
      992: {
          items: 3,
      },
      1170: {
          items: 3,
      },
      1200: {
          items: 3
      }
    }
});