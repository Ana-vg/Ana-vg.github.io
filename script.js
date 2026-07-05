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
  var revealSelectors = 'section, .project-card, .cv-buttons, .cv-note, .detail-image, .project-detail h1, .project-detail p, .cv-page h1, .skill-card, .cv-entry';
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
      'hero.badge': 'Disponible para nuevos proyectos',
      'hero.tagline': 'Desarrolladora de videojuegos — Diseño de niveles · Cinemáticas · UI',
      'hero.about': 'Soy desarrolladora en Unity, con experiencia en diseño de niveles, creación de cinemáticas y UI. Destaco por mi proactividad, trabajo en equipo y comunicación efectiva, buscando roles que combinen narrativa con el desarrollo de experiencias interactivas.',
      'hero.cta': 'Ver proyectos',
      'hero.cta2': 'Hablemos',
      'projects.heading': 'Proyectos',
      'projects.intro': 'Una selección de los juegos en los que he trabajado, con mi rol y el impacto de cada proyecto.',
      'project.role': 'Rol: [pendiente] · Motor: [pendiente]',
      'project.desc': '[Descripción pendiente: mecánica principal e impacto del proyecto]',
      'project.viewMore': 'Ver más →',
      'about.heading': 'Sobre mí',
      'about.p1': 'Soy desarrolladora en Unity con experiencia en diseño de niveles, creación de cinemáticas y UI. Me muevo entre la lógica de sistemas y el ritmo narrativo, buscando siempre que cada espacio se sienta intencional.',
      'about.p2': 'Destaco por mi proactividad, trabajo en equipo y comunicación efectiva — busco roles que combinen narrativa con el desarrollo de experiencias interactivas.',
      'about.cvButton': 'Ver CV completo →',
      'skill.unity.label': 'Unity',
      'skill.unity.detail': 'C#, prefabs, sistemas de juego',
      'skill.level.label': 'Diseño de niveles',
      'skill.level.detail': 'Ritmo, lectura espacial, flow',
      'skill.cine.label': 'Cinemáticas',
      'skill.cine.detail': 'Timeline, cámaras, montaje',
      'skill.ui.label': 'UI/UX',
      'skill.ui.detail': 'Interfaces diegéticas y de menú',
      'skill.team.label': 'Trabajo en equipo',
      'skill.team.detail': 'Comunicación, iteración rápida',
      'skill.narrative.label': 'Narrativa',
      'skill.narrative.detail': 'Diseño de experiencias con historia',
      'contact.heading': 'Contacto',
      'contact.text': '¿Tienes un proyecto en mente o quieres conversar? Escríbeme, con gusto respondo.',
      'contact.linkedin': 'LinkedIn ↗',
      'footer.text': '© 2026 Anamaría Soriano',
      'detail.back': '← Volver a proyectos',
      'detail.role': 'Rol',
      'detail.engine': 'Motor',
      'detail.duration': 'Duración',
      'detail.pending': '[pendiente]',
      'detail.descHeading': 'Descripción',
      'detail.li1': '[Reto de diseño pendiente]',
      'detail.li2': '[Solución implementada pendiente]',
      'detail.li3': '[Resultado / aprendizaje pendiente]',
      'detail.allProjects': '← Todos los proyectos',
      'cv.intro': 'Elige el idioma para ver o descargar mi currículum.',
      'cv.esButton': 'CV en Español',
      'cv.enButton': 'CV in English',
      'cv.note': '[Espacio reservado: sube aquí tus archivos PDF a la carpeta assets/ con los nombres cv-es.pdf y cv-en.pdf para que estos botones funcionen.]',
      'cv.profileHeading': 'Perfil',
      'cv.profileText': 'Desarrolladora en Unity con experiencia en diseño de niveles, creación de cinemáticas y UI. Destaco por mi proactividad, trabajo en equipo y comunicación efectiva, buscando roles que combinen narrativa con el desarrollo de experiencias interactivas.',
      'cv.experienceHeading': 'Experiencia',
      'cv.educationHeading': 'Educación',
      'cv.skillsHeading': 'Habilidades',
      'cv.toolsHeading': 'Herramientas',
      'cv.languagesHeading': 'Idiomas',
      'cv.contactHeading': 'Contacto',
      'cv.pendingRole': '[Rol pendiente]',
      'cv.pendingOrg': '[Estudio / proyecto pendiente]',
      'cv.pendingDesc': '[Describe aquí tus responsabilidades e impacto en este puesto.]',
      'cv.pendingTitle': '[Título / curso pendiente]',
      'cv.pendingInst': '[Institución pendiente]',
      'cv.native': 'Nativo',
      'cv.pendingLevel': '[nivel pendiente]'
    },
    en: {
      'nav.inicio': 'Home',
      'nav.proyectos': 'Projects',
      'nav.sobre': 'About me',
      'nav.cv': 'CV',
      'nav.contacto': 'Contact',
      'nav.correo': 'Email',
      'hero.badge': 'Available for new projects',
      'hero.tagline': 'Game developer — Level design · Cinematics · UI',
      'hero.about': "I'm a Unity developer with experience in level design, cinematic creation, and UI. I stand out for my proactivity, teamwork, and effective communication, seeking roles that combine narrative with interactive experience development.",
      'hero.cta': 'View projects',
      'hero.cta2': "Let's talk",
      'projects.heading': 'Projects',
      'projects.intro': "A selection of the games I've worked on, along with my role and the impact of each project.",
      'project.role': 'Role: [pending] · Engine: [pending]',
      'project.desc': '[Description pending: main mechanic and project impact]',
      'project.viewMore': 'See more →',
      'about.heading': 'About me',
      'about.p1': "I'm a Unity developer with experience in level design, cinematic creation, and UI. I move between systems logic and narrative pacing, always aiming for every space to feel intentional.",
      'about.p2': 'I stand out for my proactivity, teamwork, and effective communication — I look for roles that combine narrative with interactive experience development.',
      'about.cvButton': 'View full CV →',
      'skill.unity.label': 'Unity',
      'skill.unity.detail': 'C#, prefabs, game systems',
      'skill.level.label': 'Level design',
      'skill.level.detail': 'Pacing, spatial reading, flow',
      'skill.cine.label': 'Cinematics',
      'skill.cine.detail': 'Timeline, cameras, editing',
      'skill.ui.label': 'UI/UX',
      'skill.ui.detail': 'Diegetic and menu interfaces',
      'skill.team.label': 'Teamwork',
      'skill.team.detail': 'Communication, fast iteration',
      'skill.narrative.label': 'Narrative',
      'skill.narrative.detail': 'Story-driven experience design',
      'contact.heading': 'Contact',
      'contact.text': "Have a project in mind or want to chat? Write to me, I'd be glad to respond.",
      'contact.linkedin': 'LinkedIn ↗',
      'footer.text': '© 2026 Anamaría Soriano',
      'detail.back': '← Back to projects',
      'detail.role': 'Role',
      'detail.engine': 'Engine',
      'detail.duration': 'Duration',
      'detail.pending': '[pending]',
      'detail.descHeading': 'Description',
      'detail.li1': '[Design challenge pending]',
      'detail.li2': '[Implemented solution pending]',
      'detail.li3': '[Result / learning pending]',
      'detail.allProjects': '← All projects',
      'cv.intro': 'Choose a language to view or download my résumé.',
      'cv.esButton': 'CV en Español',
      'cv.enButton': 'CV in English',
      'cv.note': '[Placeholder: upload your PDF files to the assets/ folder as cv-es.pdf and cv-en.pdf to make these buttons work.]',
      'cv.profileHeading': 'Profile',
      'cv.profileText': "Unity developer with experience in level design, cinematic creation, and UI. I stand out for my proactivity, teamwork, and effective communication, seeking roles that combine narrative with interactive experience development.",
      'cv.experienceHeading': 'Experience',
      'cv.educationHeading': 'Education',
      'cv.skillsHeading': 'Skills',
      'cv.toolsHeading': 'Tools',
      'cv.languagesHeading': 'Languages',
      'cv.contactHeading': 'Contact',
      'cv.pendingRole': '[Role pending]',
      'cv.pendingOrg': '[Studio / project pending]',
      'cv.pendingDesc': '[Describe your responsibilities and impact in this role here.]',
      'cv.pendingTitle': '[Degree / course pending]',
      'cv.pendingInst': '[Institution pending]',
      'cv.native': 'Native',
      'cv.pendingLevel': '[level pending]'
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
