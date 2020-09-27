import 'bootstrap';
import Swiper from '../js/vendors';
import ScrollMagic from '../js/scrollMagic';
require('../sass/main.scss');

jQuery(function($) {

/*--------------------------------------------
    cursor
---------------------------------------------*/
function customCursor() {
  var cursor = document.querySelector('.cursor');
  var body = document.querySelector('body');
  var label = document.querySelector('.cursor-label');
  var hoverables = document.querySelectorAll([
    "button",
    "a",
    "input",
    "textarea",
    "[data-cursor]",
    "[data-cursor-label]",
    "[data-cursor-icon]"

  ]);
  var hoverablesSmall = document.querySelectorAll([
    "[data-cursor-small]",
    ".cursor-small",
    ".cursor-small span"
  ]);
  var hoverablesColor = document.querySelectorAll("[data-cursor-color]");

  // Listeners
document.body.addEventListener('mousemove', onMouseMove);
  for (var i = 0; i < hoverables.length; i++) {
    hoverables[i].addEventListener('mouseenter', onMouseHover);
    hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
  }
  for (var i = 0; i < hoverablesSmall.length; i++) {
    hoverablesSmall[i].addEventListener('mouseenter', onMouseHoverSmall);
    hoverablesSmall[i].addEventListener('mouseleave', onMouseHoverOutSmall);
  }
  for (var i = 0; i < hoverablesColor.length; i++) {
    hoverablesColor[i].addEventListener('mouseenter', onMouseHoverColor);
    hoverablesColor[i].addEventListener('mouseleave', onMouseHoverOutColor);
  }


  // Move the cursor
function onMouseMove(e) {
 TweenMax.to(cursor, .2, {
   x: e.clientX,
   y: e.clientY,
   visibility: 'visible'
});

}

// Hover an element
function onMouseHover(e) {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.add('is-active');
    }
  });
  body.classList.add('cursor-is-active');

  if (e.target.getAttribute('data-cursor-label')) {
  cursor.classList.add('has-label');
  label.innerHTML = e.target.getAttribute('data-cursor-label');
  }

}

function onMouseHoverOut(e) {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.remove('is-active');
    }
  });
  body.classList.remove('cursor-is-active');

  if (e.target.getAttribute('data-cursor-label')) {
  cursor.classList.remove('has-label');
  label.innerHTML = "";
  }
}

function onMouseHoverSmall() {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.add('is-small');
    }
  });
  body.classList.add('cursor-is-active');

}

function onMouseHoverOutSmall() {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.remove('is-small');
    }
  });
}

function onMouseHoverColor() {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.add('is-color');
    }
  });

}

function onMouseHoverOutColor() {
  TweenMax.to(cursor, {
    onStart: () => {
      cursor.classList.remove('is-color');
    }
  });

}

}

/*--------------------------------------------
    preloader
---------------------------------------------*/ 
function preloader(){
  var preloaderBg = $('.preload-bg');
  var preloadWrapLogo = $('.preload-wrap-logo');
  var preloaderMask = $('.preload-logo-mask');
  var overflowClass = $('html');
  var elementReveal = $("[data-anim-reveal-page]");

  var tl;

function initial(){
  tl = new TimelineMax();

  tl.fromTo(preloaderMask, {
    y: 100,
  }, {
    y: 0,
    ease: 'none',
    duration: 1,
    delay: 0.3,
  })
  .to(preloadWrapLogo, {
    duration: 0.5,
    ease: 'quart.inOut',
    opacity: 0,
    scale: 0.75,
  }, '>-0.1')
  .to(preloaderBg, {
    ease: 'quart.inOut',
    duration: 0.8,
    scaleY: 0,
    onComplete: () => {
      $(elementReveal).addClass('is-reveal');
    },
  }, '>-0.5')
  .from(overflowClass, {
    onComplete: () => {
      $(overflowClass).removeClass('overflow-hidden');
    }
  }, '>-0.8');
}


function init() {
  initial();
}
  init();


}

/*--------------------------------------------
    sticky navbar 
---------------------------------------------*/ 
function stickyNavBar() {
var lastScrollTop = 0;
var delta = 5;
var header = $('.header');
var offsetTop = $('.header').offset().top;
$(window).on('scroll', function(){
  var st = $(window).scrollTop();

  if (st <= 0) {
    header.removeClass('is-pinned is-sticky');
  } else {
    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop) {
      header.removeClass('is-pinned').addClass('is-sticky is-unpinned');
    } else {
      header.addClass('is-pinned').removeClass('is-unpinned');
    }
    lastScrollTop = st;
  }
  
});

  if (offsetTop > 0) {
    header.addClass('is-unpinned');
  } else {
    header.removeClass('is-unpinned');
  }
}

/*--------------------------------------------
    navbar mobile 
---------------------------------------------*/
function navMobile(){
  $('.btn-main').on('click', function (e) {
    e.preventDefault();
    $('.navbar-mobile').toggleClass('is-open');
    $('.header').toggleClass('is-sticky-mobile');

    $('body').toggleClass('overflow-hidden');
    if($('.navbar-mobile').hasClass('is-open')){
        setTimeout(function(){
            $('.btn-main').addClass('is-open');
        }, 400);
    }else {
        setTimeout(function(){
            $('.btn-main').removeClass('is-open');
        }, 200); 
    }
});
} 


/*--------------------------------------------
    slider hero
---------------------------------------------*/ 
function heroSlider(){
    var swiper = new Swiper('.swiper-container', {
        effect: 'fade',
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" data-cursor-small></span>';
          },
        },
        simulateTouch: false,
      });
      customCursor();
}

/*--------------------------------------------
    header img position Y
---------------------------------------------*/
function headerImgPositionY() {
  var headerImg = $('.header-page .header-content');
  var position = $(headerImg).attr('data-position');
    $(headerImg).css({
      backgroundPosition: 100 +'%' + position + '%'
  });
}

/*--------------------------------------------
    header scroll to content
---------------------------------------------*/
function HeaderScrollTo() {
  $('.btn-scroll').on('click', function(){
    $('html, body').animate({scrollTop: $(this.hash).offset().top + 1}, 800);
    return false;
  });
}

/*--------------------------------------------
    counter
---------------------------------------------*/
function counter(){

  var event = false;
  if($('.counter').length){
  var sectionPositionTop = $('.counter').offset().top;
  }

$(window).on('scroll', function() {

 var currentPosition = $(document).scrollTop();
 if (currentPosition > sectionPositionTop && event === false) {
   event = true;

   $('.number').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-number');
    
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
  
    {
  
      duration: 8000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }
  
    });  
  });
 }

});

}

/*--------------------------------------------
    player audio
---------------------------------------------*/
function player() {
  var audio = {    
        init: function() {        
        var $that = this;        
            $(function() {            
                $that.components.media();   
            });    
        },
        components: {        
            media: function(target) {             
                var media = $('audio.fc-media', (target !== undefined) ? target : 'body');   
                if (media.length) {              
                    media.mediaelementplayer({                 
                        audioHeight: 40,
                        features : ['playpause', 'current', 'duration', 'progress', 'tracks', 'fullscreen', 'loop'],
                        alwaysShowControls      : true,
                        timeAndDurationSeparator: '<span></span>',
                        // iPadUseNativeControls: true,
                        // iPhoneUseNativeControls: false,
                        // AndroidUseNativeControls: true,
                        playText: '',
                        pauseText: '',
                        loopText: '',
                        autoRewind: true,
                        enableProgressTooltip: false,
                        success: function (target) {
                          $('.mejs__playpause-button button').attr('data-cursor','');
                          $('.mejs__loop-button button').attr('data-cursor','');
                          target.addEventListener('ended', function (e) {
                              if ($('.mejs__loop-button').hasClass('mejs__loop-on')) {
                                target.play();
                              } else {
                                target.load();
                              }
                          }, false);
                          target.addEventListener('play', function (e) {
                            $('.mejs__playpause-button').addClass('anim-pulse')
                          }, false);
                          target.addEventListener('pause', function (e) {
                            $('.mejs__playpause-button').removeClass('anim-pulse')
                          }, false);
                          customCursor();
                        },   
                    });          
                }        
            },
                
        },
    };
    audio.init();
}

/*--------------------------------------------
    formulaire contact
---------------------------------------------*/
function contactForm() {
  $('.wrap-form-contact input, .wrap-form-contact textarea').on("focus blur", function() {
  if  ($('.wrap-form-contact input, .wrap-form-contact textarea').is(':focus')) {
    $(this).siblings().addClass('active');
    $(this).parent().addClass('active');

  } else if ($(this).val().length > 0 ) {
      $('.wrap-form-contact .input-wrap').removeClass('active');
  } else {
    $(this).siblings().removeClass('active');
    $(this).parent().removeClass('active');
  }   
});    
} 

/*--------------------------------------------
    parallax
---------------------------------------------*/
function parallax(){
$('.parallax').jarallax();
}

/*--------------------------------------------
    hide scroll to opacity
---------------------------------------------*/
function scrollToOpacity() {
  $(document).on('scroll', function(){
      var opacity = 1;
      var headerContent = $('.header-page').outerHeight() / 2;
      var classOpacity = $('.js-opacity');
  
      if(headerContent < $(document).scrollTop()){
          opacity = 0;
          }else {    
          opacity = opacity - ( $(document).scrollTop() / headerContent ); 
          }
          classOpacity.css('opacity', opacity);
  });
}

/*--------------------------------------------
    back to top
---------------------------------------------*/
function toTop() {
  if ($('#scroll-to-top').length) {
    var scrollTrigger = 900,
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('.btn-to-top').addClass('show');
            } else {
                $('.btn-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('.btn-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
  }
}

/*--------------------------------------------
    infinite scroll 
---------------------------------------------*/
function infiniteScroll() {
    $('.sound .container .row').infiniteScroll({
      path: '/productions/page/{{#}}',
      append: '.wrap-player',
      button: '.view-more-button',
      // using button, disable loading on scroll 
      // scrollThreshold: false,
      // button: '.view-more-button',
      scrollThreshold : 10,
      history: false,
      status: '.page-load-status',
      checkLastPage: '.pagination__next',
      hideNav: '.pagination',
      onInit: function() {
        this.on( 'append', function() {
          player();
        })
      }
    });
}

/*--------------------------------------------
   geometric effect parallax
---------------------------------------------*/
function geometricParallax(){
  var geometricHeader = $("[data-geometric-header]");
  var geometricSound = $("[data-geometric-sound]");

  $(geometricHeader).on('mousemove', function(e) {
    parallaxHeader(e, ".geometric-hero-1", -25);
    parallaxHeader(e, ".geometric-hero-2", -15);
    parallaxHeader(e, ".geometric-hero-5", -30);
    parallaxHeader(e, ".geometric-hero-6", -20);
  });

  $(geometricSound).on('mousemove', function(e) {
    parallaxSound(e, ".geometric-last-sound-1", -40);
    parallaxSound(e, ".geometric-last-sound-2", -55);
    parallaxSound(e, ".geometric-last-sound-5", -20);
  });
  
  function parallaxHeader(e, target, movement) {
    var $this = $(geometricHeader);
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
  
    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }

  function parallaxSound(e, target, movement) {
    var $this = $(geometricSound);
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
  
    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }
}

/*--------------------------------------------
   scroll reveal element
---------------------------------------------*/
function revealElements(){
  // init controller
  var controller = new ScrollMagic.Controller();
  
  function revealElement() {
    var animationElement = document.querySelectorAll('[data-anim-reveal]');
  
    for (let i = 0; i < animationElement.length; i++) {
      const el = animationElement[i];
    
    new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })  
      .on('enter', function (event) {
        el.classList.add('is-reveal');
      })
      .addTo(controller);
    }
  }

  function revealElementPage() {
    var animationElementPage = document.querySelectorAll('[data-anim-reveal-page]');
  
    for (let i = 0; i < animationElementPage.length; i++) {
      const el = animationElementPage[i];
    
    new ScrollMagic.Scene({
        offset: '260px',
        triggerElement: el,
        triggerHook: 0,
        reverse: false,
      })   
      .on('enter', function (event) {
        el.classList.add('is-reveal');
      })
      .addTo(controller);
    }
  }

  revealElement();
  revealElementPage();
  
  }

/*--------------------------------------------
    load function
---------------------------------------------*/
$(function() {
    customCursor();
    preloader();
    navMobile();
    stickyNavBar();
    heroSlider();
    headerImgPositionY();
    HeaderScrollTo();
    counter();
    player();
    contactForm();
    parallax();
    scrollToOpacity()
    toTop();
    infiniteScroll();
    geometricParallax();
    revealElements();   
});

});