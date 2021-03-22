'use strict';

document.addEventListener("DOMContentLoaded", function() {
  let head, fixhead, showPos, scroll, headLinks;

  head = document.querySelector('.head');
  fixhead = document.querySelector('.fixhead');
  showPos = head.offsetHeight - fixhead.offsetHeight * 2;

  headLinks = head.querySelectorAll('a:not(.phone)');

  //SHOW/HIDE FIXED NAV BASED ON SCROLL POSITION
  window.addEventListener('scroll', function() {
    scroll = window.scrollY;
    if(scroll >= showPos) {
      fixhead.classList.add('show');
    } else {
      fixhead.classList.remove('show');
    }
  });

  //SMOOTH SCROLLING FUNCTION
  function scrollTo(to, duration) {
    let start = document.documentElement.scrollTop || document.body.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

    let animateScroll = function() {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      document.documentElement.scrollTop = document.body.scrollTop = val;
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  //ANIMATION EASING FUNCTION
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  // //NAV TARGET ANIMATION
  function scrollTargets(anchor) {
    anchor.onclick = function(e) {
      e.preventDefault();
      let target, to;
      target = document.querySelector(anchor.hash);
      to = target.offsetTop - target.scrollTop - target.clientTop - fixhead.offsetHeight + 20;

      scrollTo(to, 1250);

      document.querySelector('.fixhead__box').checked = false;
    }
  }

  headLinks.forEach(function(link) {
    scrollTargets(link);
  });

  //UNCHECK RADIO BUTTON FOR LEGEND IF CHECKED
  var labels = document.querySelectorAll('.menu__clickme');
  var allIcons = document.querySelectorAll('.pizza .icon');

  labels.forEach(function(l){
    l.addEventListener('click', function(e){
      var category = this.id.replace('radio-label-', '');
      var radio = document.getElementById('radio-' + category);
      var icons = document.querySelectorAll('.pizza .icon-' + category);

      //remove selected class from all
      labels.forEach(function(l) {
        l.classList.remove('selected');
      });
      allIcons.forEach(function(i) {
        i.classList.remove('selected');
      });

      //add selected class to relevent icons
      l.classList.add('selected');
      icons.forEach(function(i) {
        i.classList.add('selected');
      });

      //if clicking already selected category, reset all
      if(radio.checked) {
        e.preventDefault();
        radio.checked = false;
        l.classList.remove('selected');
        allIcons.forEach(function(i) {
          i.classList.remove('selected');
        });
      }
    });
  });

  //SHOW/HIDE BIG ALERT THING
  // const bigAlert = document.querySelector('.big-alert');
  // const killButton = document.querySelectorAll('.big-alert .kill-it');

  // bigAlert.addEventListener('click', function() {
  //   bigAlert.classList.toggle('open');
  // });

  // killButton.forEach(function(btn) {
  //   btn.addEventListener('click', function() {
  //     bigAlert.parentNode.removeChild(bigAlert);
  //   });
  // });

  //SHOW/HIDE ALERTS
  const betterAlert = document.querySelectorAll('.better-alert .subject');
  console.log(betterAlert);

  betterAlert.forEach(el => {
    el.addEventListener('click', function() {
      el.classList.toggle('active');
    });
  });


  var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

});
