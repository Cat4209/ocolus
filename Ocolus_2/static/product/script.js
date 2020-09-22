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
        slidesPerView: 3,
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
});