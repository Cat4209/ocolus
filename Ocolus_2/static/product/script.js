$(document).ready(function(){
    $('.burger').bind("click", ()=>{
        $('.bar').toggleClass('open');
        $('.navigation_mb').toggleClass('open');
       $('body').toggleClass('open');
   });
    window.addEventListener('resize', ()=>{
        if($(document).innerWidth() <= 930){
            $('.header_info').removeClass('col-10');
            $('.header_info').addClass('col-12');
        }else{
            $('.header_info').removeClass('col-12');
            $('.header_info').addClass('col-10');
        }
        if($(document).innerWidth() <= 830){
            $('.found_products').text("Products");
        }
    });
    if($(document).innerWidth() <= 930){
        $('.header_info').removeClass('col-10');
        $('.header_info').addClass('col-12');
    }else{
        $('.header_info').removeClass('col-12');
        $('.header_info').addClass('col-10');
    }
    let galleryThumbs = new Swiper('.gallery-thumbs',{
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        loopedSlides: 5,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.gallery_thumbs_next',
            prevEl: '.gallery_thumbs_prev',
        },
        centeredSlides: true,
    });
    let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        speed: 900,
        loopedSlides: 5,
        navigation: {
            nextEl: '.arrow_right',
            prevEl: '.arrow_left',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
        initialSlide: document.getElementById('dop_num_js').innerHTML - 1,
    });
    (function() {
  if (window.pluso)if (typeof window.pluso.start == "function") return;
  if (window.ifpluso==undefined) { window.ifpluso = 1;
    var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
    s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
    var h=d[g]('body')[0];
    h.appendChild(s);
  }})();
    $('.add_to_cart').bind('click', ()=>{
        Swal.fire({
            title: '<span class="alert_info_title">' + $('.swiper-slide-active .product_name').text() + '</span>',
            html: '<span class="alert_info_body">Product has been added !</span>',
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: `Continue`,
            denyButtonText: `Go to Cart`
        }).then((result)=>{
           if(result.isConfirmed == false){
               window.location="/shop";
           }else{
               window.location.reload(false);
           } 
        });
    });
});