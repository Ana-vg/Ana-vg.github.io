document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var navContact = document.querySelector('.nav-contact');

                            if (toggle && navLinks && navContact) {
                                  var closeMenu = function () {
                                          navLinks.classList.remove('open');
                                          navContact.classList.remove('open');
                                          toggle.setAttribute('aria-expanded', 'false');
                                          toggle.textContent = '☰';
                                  };

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
                            }

                            // Scroll reveal animations
                            var revealSelectors = 'section, .project-card, .cv-buttons, .cv-note, .detail-image, .project-detail h1, .project-detail p, .cv-page h1';
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSelectors));
    revealEls.forEach(function (el) { el.classList.add('reveal'); });

                            if ('IntersectionObserver' in window) {
                                  var observer = new IntersectionObserver(function (entries) {
                                          entries.forEach(function (entry) {
                                                    if (entry.isIntersecting) {
                                                                entry.target.classList.add('in-view');
                                                                observer.unobserve(entry.target);
                                                    }
                                          });
                                  }, { threshold: 0.15 });

      revealEls.forEach(function (el) { observer.observe(el); });
                            } else {
                                  revealEls.forEach(function (el) { el.classList.add('in-view'); });
                            }

                            // Ripple effect on call-to-action buttons
                            document.querySelectorAll('.cta-button').forEach(function (btn) {
                                  btn.addEventListener('click', function (e) {
                                          var existing = btn.querySelector('.ripple');
                                          if (existing) existing.remove();

                                                             var ripple = document.createElement('span');
                                          ripple.className = 'ripple';
                                          var rect = btn.getBoundingClientRect();
                                          ripple.style.left = (e.clientX - rect.left) + 'px';
                                          ripple.style.top = (e.clientY - rect.top) + 'px';
                                          btn.appendChild(ripple);

                                                             setTimeout(function () { ripple.remove(); }, 650);
                                  });
                            });
});
