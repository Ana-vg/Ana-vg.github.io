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

  // Localization (ES / EN)
  var translations = {
    es: {
      'nav.inicio': 'Inicio',
      'nav.proyectos': 'Proyectos',
      'nav.sobre': 'Sobre mí',
      'nav.cv': 'CV',
      'nav.contacto': 'Contacto',
      'nav.correo': 'Correo',
      'hero.tagline': 'Desarrolladora de videojuegos — Diseño de niveles · Cinemáticas · UI',
      'hero.about': 'Soy desarrolladora en Unity, con experiencia en diseño de niveles, creación de cinemáticas y UI. Destaco por mi proactividad, trabajo en equipo y comunicación efectiva, buscando roles que combinen narrativa con el desarrollo de experiencias interactivas.',
      'hero.cta': 'Ver proyectos',
      'projects.heading': 'Proyectos',
      'projects.intro': 'Una selección de los juegos en los que he trabajado, con mi rol y el impacto de cada proyecto.',
      'project.role': 'Rol: [pendiente] · Motor: [pendiente]',
      'project.desc': '[Descripción pendiente: mecánica principal e impacto del proyecto]',
      'project.viewMore': 'Ver más →',
      'about.heading': 'Sobre mí',
      'about.cvButton': 'Ver CV',
      'contact.heading': 'Contacto',
      'contact.text': '¿Tienes un proyecto en mente o quieres conversar? Escríbeme, con gusto respondo.',
      'footer.text': '© 2026 Anamaría Soriano'
    },
    en: {
      'nav.inicio': 'Home',
      'nav.proyectos': 'Projects',
      'nav.sobre': 'About me',
      'nav.cv': 'CV',
      'nav.contacto': 'Contact',
      'nav.correo': 'Email',
      'hero.tagline': 'Game developer — Level design · Cinematics · UI',
      'hero.about': "I'm a Unity developer with experience in level design, cinematic creation, and UI. I stand out for my proactivity, teamwork, and effective communication, seeking roles that combine narrative with interactive experience development.",
      'hero.cta': 'View projects',
      'projects.heading': 'Projects',
      'projects.intro': "A selection of the games I've worked on, along with my role and the impact of each project.",
      'project.role': 'Role: [pending] · Engine: [pending]',
      'project.desc': '[Description pending: main mechanic and project impact]',
      'project.viewMore': 'See more →',
      'about.heading': 'About me',
      'about.cvButton': 'View CV',
      'contact.heading': 'Contact',
      'contact.text': "Have a project in mind or want to chat? Write to me, I'd be glad to respond.",
      'footer.text': '© 2026 Anamaría Soriano'
    }
  };

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var dict = translations[lang];
      if (dict && dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
    var langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
      langBtn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
    }
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  var savedLang = 'es';
  try { savedLang = localStorage.getItem('site-lang') || 'es'; } catch (e) {}
  applyLanguage(savedLang);

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
      applyLanguage(current === 'es' ? 'en' : 'es');
    });
  }
});
