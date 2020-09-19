import 'bootstrap';
import Swiper from '../js/plugins';
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
  var icon = document.querySelector('.cursor-icon');
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
   y: e.clientY
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
  var preloader = $('.preload');
  var preloaderBg = $('.preload-bg');
  var preloadWrapLogo = $('.preload-wrap-logo');
  var preloaderLogo = $('.preload-logo');
  var preloaderMask = $('.preload-logo-mask');
  var overflowClass = $('html');
  var elementReveal = $("[data-anim-reveal-page]");
  // var E = "Power1.easeInOut";
  // var C = "Power3.easeOut";

  var tl;

function initial(){
  tl = new TimelineMax();
  // tl.set(overflowClass, {
  //   className:"+=overflow-hidden"
  // })
  // $('html').addClass('overflow-hidden');

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
      // $('html').removeClass('overflow-hidden');
      $(elementReveal).addClass('is-reveal');
    },
  }, '>-0.5')
  .from(overflowClass, {
    // className:"-=overflow-hidden"
    onComplete: () => {
      $(overflowClass).removeClass('overflow-hidden');
    }
  }, '>-0.8');
}


// function show(){
//   tl = gsap.timeline();

//   tl
//   .set(preloadWrapLogo, {
//     y: 60,
//     scale: 0.75,
//   })
//   .set(preloaderMask, {
//     y: 100,
//   })

//   .to(preloaderBg, {
//     ease: 'quart.inOut',
//     duration: 0.6,
//     scaleY: 1,
//     onStart: () => {
//       $('html').addClass('overflow-hidden');
//     },
//   })
//   .to(preloadWrapLogo, {
//     delay: 0.1,
//     duration: 0.6,
//     ease: 'quart.out',
//     scale: 1,
//     y: 0,
//   })
//   .to(preloaderMask, {
//     y: 0,
//     duration: 1,
//     ease: 'none',
//   }, '>-0.3')
// }

// function hide() {
//   tl = gsap.timeline();

//   tl
//     .to(preloadWrapLogo, {
//       delay: 0.15,
//       duration: 0.5,
//       ease: 'quart.inOut',
//       opacity: 0,
//       scale: 0.75,
//     })
//     .to(preloaderBg, {
//       ease: 'quart.inOut',
//       duration: 0.6,
//       scaleY: 0,
//       onComplete: () => {
//         $('html').removeClass('overflow-hidden');
//       },
//     }, '>-0.5')
// }

function init() {
  initial();
  // show();
  // hide();
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
$(window).on('scroll', function(){
  var st = $(window).scrollTop();

  // if (st > lastScrollTop) {
  //   header.addClass('is-unpinned').addClass('is-sticky').removeClass('is-pinned');
  // } else if (st == 0 ) {
  //     header.removeClass('is-pinned').removeClass('is-sticky');
  // } else {
  //   header.addClass('is-pinned').removeClass('is-unpinned');
  // }
  // lastScrollTop = st;

  if (st <= 0) {
    header.removeClass('is-pinned is-sticky');
  } else {
    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop ) {
      header.removeClass('is-pinned').addClass('is-sticky is-unpinned');
    } else {
      header.addClass('is-pinned').removeClass('is-unpinned');
    }
    lastScrollTop = st;
  }
  
});

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
        // spaceBetween: 30,
        // cssMode: true,
        // centeredSlides: true,
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
        //alert('finished');
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
  // var rellax = new Rellax('.rellax');

// if($('div').hasClass('rellax')) {
//   var rellax = new Rellax('.rellax');
// }
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
      // var headerTitle = $('.header-title');
  
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
    var scrollTrigger = 900, // px
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

  $(geometricHeader).mousemove(function(e) {
    parallaxHeader(e, ".geometric-hero-1", -25);
    parallaxHeader(e, ".geometric-hero-2", -15);
    parallaxHeader(e, ".geometric-hero-5", -30);
  });

  $(geometricSound).mousemove(function(e) {
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
    
    // create a scene
    new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      // .setPin(".about-name") // pins the element for the the scene's duration
      // .addTo(controller); // assign the scene to the controller
    
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
    
    // create a scene
    new ScrollMagic.Scene({
        offset: '260px',
        triggerElement: el,
        triggerHook: 0,
        reverse: false,
      })
      // .setPin(".about-name") // pins the element for the the scene's duration
      // .addTo(controller); // assign the scene to the controller
    
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
$(document).ready(function() {
    customCursor();
    preloader();
    // navBar();
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

$(window).on('load', function(){
});


});