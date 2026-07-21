/* AIGAH — shared page behaviour */
(function () {
  'use strict';

  /* Sticky header: hairline bottom border once the page is scrolled */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 4);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Newsletter form: submit in place, inline success/error messaging */
  var form = document.querySelector('.newsletter-form');
  var message = document.querySelector('.newsletter-message');
  if (form && message) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button');
      button.disabled = true;
      fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      })
        .then(function () {
          message.textContent = 'Thank you — please check your inbox to confirm your subscription.';
          message.hidden = false;
          form.reset();
        })
        .catch(function () {
          message.textContent = 'Something went wrong. Please try again, or write to hello@aigah.org.';
          message.hidden = false;
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }
})();
