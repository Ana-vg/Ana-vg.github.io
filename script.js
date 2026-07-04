document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navContact = document.querySelector('.nav-contact');
  if (!toggle || !navLinks || !navContact) return;

  function closeMenu() {
    navLinks.classList.remove('open');
    navContact.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }

  toggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navContact.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  navContact.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
