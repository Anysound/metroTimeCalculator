(function() {
  $(document).ready(function() {

    // initialization slick.js
    $(".slider").slick();

    // плавное появление заголовка
    $('.slider').on('afterChange', function() {
      var activeSlide = document.querySelector('.slick-active');
      var text = activeSlide.querySelector('.slider__text');
      text.style.opacity = '1';
      
    });

    $('.slider').on('beforeChange', function() {
      var activeSlide = document.querySelector('.slick-active');
      var text = activeSlide.querySelector('.slider__text');
      text.style.opacity = '0';
    })
  
    document.querySelector('.main-content__btn').addEventListener('mousedown', function() {
      document.querySelector('.left-column').classList.toggle('hidden-menu');
      document.querySelector('.main-content').classList.toggle('full-width');
    })

    
  });
  
})()
