/* ── Ludi Design ─────────────────────────────────────────────────────────
   Routage par ancre et carrousel des projets à l'accueil.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* Projet affiché par défaut à l'accueil. */
  var DEFAULT_PROJECT = 'stay-focus';

  var SITE_NAME = 'Ludi Design';

  /* `cover` : visuel principal (accueil et galerie). `size` : ses dimensions
     en pixels, [largeur, hauteur] — facultatif, mais évite que la galerie
     ne bouge pendant le chargement. */
  var PROJECTS = [
    {
      slug: 'fin-haut',
      name: 'Fin Haut',
      meta: 'Édition - 2022',
      cover: 'assets/pf-finhaut.webp',
      size: [1500, 1185],
      typo: 'ITC Giovanni Std, GT America',
      desc: "Archivage de quatre témoignages sur la disparition du tourisme dans la commune de Finhaut, autrefois populaire auprès des étrangers."
    },
    {
      slug: 'pot-de-miel',
      name: 'Pot de miel',
      meta: 'Packaging - 2025',
      cover: 'assets/pf-potmiel.webp',
      size: [728, 1280],
      typo: 'Syntax',
      desc: "Conception d'étiquette et de packaging pour des pots de miel offerts aux collaborateurs de la Ligue pulmonaire fribourgeoise. Projet réalisé en collaboration avec Créambule."
    },
    {
      slug: 'k-pop-festival',
      name: 'K-Pop Festival',
      meta: 'Identité visuelle - 2021',
      cover: 'assets/pf-kpop.webp',
      size: [1500, 1169],
      typo: 'Avenir Next LT Pro',
      desc: "Identité visuelle pour un festival de musique de pop coréenne. Le changement de rythme, une de ses particularités, a servi de base au style graphique de l'événement."
    },
    {
      slug: 'championnat-de-volley-ball',
      name: 'Championnat de volley-ball',
      meta: 'Affiche - 2021',
      cover: 'assets/pf-volley.webp',
      size: [752, 1096],
      typo: 'Akzidenz Grotesk Std',
      desc: "Série d'affiches réalisée pour un championnat de volley-ball opposant diverses équipes dans trois lieux différents."
    },
    {
      slug: 'film-festival-bienne-biel',
      name: 'Film Festival Bienne/Biel',
      meta: 'Identité visuelle - 2022',
      cover: 'assets/pf-filmfestival.webp',
      size: [1500, 1164],
      typo: 'Plantin Std, Helvetica LT Std',
      desc: "Identité visuelle pour un festival dédié à la découverte des productions cinématographiques étrangères. L'édition 2022 est consacrée au cinéma asiatique, proposant des films, courts-métrages et documentaires l'ayant pour sujet ou y ayant été produits."
    },
    {
      slug: 'la-nuit-des-musees',
      name: 'La Nuit Des Musées',
      meta: 'Affiche - 2022',
      cover: 'assets/pf-nuitmusees.webp',
      size: [1064, 1443],
      typo: 'Avenir Next LT Pro',
      desc: "Affiche dépliante avec le programme pour l'événement de La Nuit Des Musées 2022."
    },
    {
      slug: 'saeg',
      name: 'SÆG',
      meta: 'Identité visuelle - 2024',
      cover: 'assets/pf-saeg.webp',
      size: [1500, 734],
      typo: 'Sæg, Assistant',
      desc: "Identité visuelle pour un magasin de mode éco-responsable au style alternatif, axé sur des vêtements pour les jeunes et mettant l'accent sur l'écologie."
    },
    {
      slug: 'carre',
      name: 'Carré',
      meta: 'Édition - 2022',
      cover: 'assets/pf-carre.webp',
      size: [1320, 1134],
      typo: 'Letter Gothic Mono',
      desc: "Livre réunissant trois concepts réalisés sur la base de trois mots : limite, chaos et transparence."
    },
    {
      slug: 'ecole-de-musique-digitale-de-neuchatel',
      name: 'École de musique digitale de Neuchâtel',
      meta: 'Identité visuelle - 2022',
      cover: 'assets/pf-ecolemusique.webp',
      size: [1500, 783],
      typo: 'Avenir Next LT Pro, Gotham',
      desc: "Conception d'une identité visuelle pour une école de musique électronique, mettant en avant la possibilité d'évoluer dans les formations qu'elle propose."
    },
    {
      slug: 'texere',
      name: 'Texere',
      meta: 'Édition - 2022',
      cover: 'assets/pf-texere.webp',
      size: [1376, 1230],
      typo: 'BauLF',
      desc: "Recueil de photographies d'éléments naturels transformés en trames abstraites."
    },
    {
      slug: 'stay-focus',
      name: 'Stay Focus',
      meta: 'Identité visuelle - 2024',
      cover: 'assets/hero-stayfocus.webp',
      size: [1500, 1300],
      typo: 'Altivo',
      desc: "Identité visuelle pour une entreprise de location d'espaces de coworking dédiés aux étudiants, en collaboration avec des établissements scolaires.",
      shots: [
        { src: 'assets/sf-imac.webp', alt: 'Site stay focus', className: 'shots__main' },
        { src: 'assets/sf-screens.webp', alt: 'Écrans du site' },
        { src: 'assets/sf-flyers.webp', alt: 'Flyers stay focus', className: 'shots__wide' }
      ]
    }
  ];

  var el = {
    home: document.getElementById('view-home'),
    pages: document.getElementById('pages'),
    project: document.getElementById('view-project'),
    about: document.getElementById('view-about'),
    services: document.getElementById('view-services'),
    contact: document.getElementById('view-contact'),
    portfolio: document.getElementById('view-portfolio'),
    gallery: document.getElementById('gallery'),
    back: document.getElementById('back'),
    visual: document.querySelector('.home__visual'),
    list: document.getElementById('projects'),
    pName: document.getElementById('p-name'),
    pMeta: document.getElementById('p-meta'),
    pDesc: document.getElementById('p-desc'),
    pTypo: document.getElementById('p-typo'),
    pShots: document.getElementById('p-shots'),
    pCover: document.getElementById('p-cover')
  };

  var activeSlug = null;
  var booted = false;

  /* La liste boucle : elle est rendue en plusieurs copies, assez de part et
     d'autre pour ne jamais voir de bord, même en défilant vite. Seule la
     copie du milieu est « réelle » : focusable et lue par les lecteurs
     d'écran. */
  var N = PROJECTS.length;
  var ITEM_H = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--item-h')) || 56;
  var SIDE = Math.max(2, Math.ceil(1600 / (N * ITEM_H)));
  var MIDDLE = SIDE;
  var nodes = [];

  /* Profondeur de chaque vue : sert à savoir si l'on avance ou si l'on
     revient, donc de quel côté la page doit glisser. */
  var DEPTH = { home: 0, portfolio: 1, about: 1, services: 1, contact: 1, project: 2 };
  var previousView = null;

  /* D'où l'on est arrivé sur une page projet (accueil ou galerie) : c'est
     là que ramène la flèche de retour. */
  var indexView = 'home';
  var galleryScrollY = 0;
  var galleryWidth = 0;
  var tiles = [];

  /* Les visuels ne sont créés qu'une fois leur source connue : pas d'image
     vide dans le HTML livré. */
  el.hero = document.createElement('img');
  el.hero.className = 'home__hero anim';
  el.visual.appendChild(el.hero);

  function findProject(slug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return PROJECTS[i];
    }
    return null;
  }

  /* ── Liste des projets ─────────────────────────────────────────────── */

  function buildList() {
    var frag = document.createDocumentFragment();

    for (var copy = 0; copy < SIDE * 2 + 1; copy++) {
      for (var index = 0; index < N; index++) {
        var node = buildNode(PROJECTS[index], index, copy, nodes.length);
        nodes.push(node);
        frag.appendChild(node.li);
      }
    }

    el.list.appendChild(frag);

    /* Rayon visible : jamais plus d'un tour de liste, pour qu'aucun projet
       n'apparaisse deux fois à l'écran. */
    var reach = Math.min(5.5, N / 2);
    el.list.style.setProperty('--reach', reach);
    el.list.style.setProperty('--solid', Math.max(1, reach - 2.5));
  }

  function buildNode(project, index, copy, k) {
    var isReal = copy === MIDDLE;

    var li = document.createElement('li');
    li.className = isReal ? 'anim' : 'anim is-clone';
    if (!isReal) li.setAttribute('aria-hidden', 'true');

    var link = document.createElement('a');
    link.className = 'project-link';
    link.href = '#/projet/' + project.slug;
    if (!isReal) link.tabIndex = -1;

    var text = document.createElement('div');
    text.className = 'project-link__text';

    var name = document.createElement('div');
    name.className = 'project-link__name';
    name.textContent = project.name;

    var meta = document.createElement('div');
    meta.className = 'project-link__meta';
    meta.textContent = project.meta;

    text.appendChild(name);
    text.appendChild(meta);

    var go = document.createElement('span');
    go.className = 'project-link__go';
    go.setAttribute('aria-hidden', 'true');

    var chevron = document.createElement('span');
    chevron.className = 'chevron';
    go.appendChild(chevron);

    link.appendChild(text);
    link.appendChild(go);

    link.addEventListener('click', function (e) { onLinkClick(e, k); });
    if (isReal) link.addEventListener('focus', function () { onLinkFocus(index); });

    li.appendChild(link);

    return { li: li, link: link, project: project, index: index, copy: copy };
  }

  function setActive(slug) {
    if (slug === activeSlug) return;
    var project = findProject(slug);
    if (!project) return;

    activeSlug = slug;
    swapHero(project);
    preloadAround(PROJECTS.indexOf(project));
  }

  var swapTimer = 0;
  var swapToken = 0;

  /* Fondu du grand visuel. En défilant vite, seul le dernier projet
     atteint s'affiche : les intermédiaires sont ignorés. */
  function swapHero(project) {
    window.clearTimeout(swapTimer);
    var token = ++swapToken;

    if (el.hero.getAttribute('src') === project.cover) {
      el.hero.classList.remove('is-swapping');
      return;
    }

    if (!booted) {
      el.hero.src = project.cover;
      el.hero.alt = project.name;
      return;
    }

    el.hero.classList.add('is-swapping');
    swapTimer = window.setTimeout(function () {
      el.hero.src = project.cover;
      el.hero.alt = project.name;

      var reveal = function () {
        if (token === swapToken) el.hero.classList.remove('is-swapping');
      };
      if (el.hero.decode) el.hero.decode().then(reveal, reveal);
      else reveal();
    }, 160);
  }

  /* ── Vue projet ────────────────────────────────────────────────────── */

  function renderProject(project) {
    var fromGallery = indexView === 'portfolio';
    el.back.href = fromGallery ? '#/portfolio' : '#/';
    el.back.setAttribute('aria-label', fromGallery ? 'Retour au portfolio' : "Retour à l'accueil");

    el.pName.textContent = project.name;
    el.pMeta.textContent = project.meta;
    el.pDesc.textContent = project.desc;
    el.pTypo.textContent = project.typo;

    var hasShots = Boolean(project.shots && project.shots.length);
    el.pShots.hidden = !hasShots;
    el.pCover.hidden = hasShots;

    if (hasShots) renderShots(project.shots);
    else renderCover(project);
  }

  function renderCover(project) {
    var img = document.createElement('img');
    img.className = 'cover';
    img.src = project.cover;
    img.alt = project.name;

    el.pCover.textContent = '';
    el.pCover.appendChild(img);
  }

  /* Série de visuels, pour les projets qui en ont plusieurs. */
  function renderShots(shots) {
    var frag = document.createDocumentFragment();

    shots.forEach(function (shot) {
      var img = document.createElement('img');
      img.src = shot.src;
      img.alt = shot.alt;
      if (shot.className) img.className = shot.className;
      frag.appendChild(img);
    });

    el.pShots.textContent = '';
    el.pShots.appendChild(frag);
  }

  /* ── Galerie ───────────────────────────────────────────────────────── */

  function buildGallery() {
    var frag = document.createDocumentFragment();

    PROJECTS.forEach(function (project, i) {
      var li = document.createElement('li');
      li.className = 'tile anim';
      li.style.setProperty('--step', Math.min(i, 10));

      var link = document.createElement('a');
      link.className = 'tile__link';
      link.href = '#/projet/' + project.slug;

      var frame = document.createElement('div');
      frame.className = 'tile__frame';

      /* Le nom du projet est dans la légende : l'image reste décorative.
         `loading` avant `src`, sinon le chargement part tout de suite. */
      var img = document.createElement('img');
      img.className = 'tile__img';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      if (project.size) {
        img.width = project.size[0];
        img.height = project.size[1];
      }
      img.addEventListener('load', function () {
        img.classList.add('is-loaded');
        /* Sans dimensions connues, la vignette n'a sa vraie hauteur qu'une
           fois l'image chargée. */
        if (!project.size) layoutGallery();
      });
      img.src = project.cover;
      frame.appendChild(img);

      var caption = document.createElement('div');
      caption.className = 'tile__caption';

      var text = document.createElement('div');

      var name = document.createElement('span');
      name.className = 'tile__name';
      name.textContent = project.name;

      var meta = document.createElement('span');
      meta.className = 'tile__meta';
      meta.textContent = project.meta;

      text.appendChild(name);
      text.appendChild(meta);

      var go = document.createElement('span');
      go.className = 'tile__go';
      go.setAttribute('aria-hidden', 'true');

      var chevron = document.createElement('span');
      chevron.className = 'chevron';
      go.appendChild(chevron);

      caption.appendChild(text);
      caption.appendChild(go);

      link.appendChild(frame);
      link.appendChild(caption);
      li.appendChild(link);
      frag.appendChild(li);

      tiles.push({ li: li, link: link, slug: project.slug });
    });

    el.gallery.appendChild(frag);
  }

  /* Chaque vignette occupe autant de rangées de 1px que sa hauteur, plus
     l'espacement : en mode « dense », la grille la range alors dans la
     colonne la plus courte, sans changer l'ordre de lecture du HTML. */
  function layoutGallery() {
    if (el.portfolio.hidden) return;

    var gap = parseFloat(getComputedStyle(el.gallery).columnGap) || 0;
    var heights = tiles.map(function (tile) {
      return tile.li.getBoundingClientRect().height;
    });

    tiles.forEach(function (tile, i) {
      tile.li.style.gridRowEnd = 'span ' + Math.ceil(heights[i] + gap);
    });
  }

  function onGalleryResize() {
    var width = el.gallery.clientWidth;
    if (width === galleryWidth) return;
    galleryWidth = width;
    layoutGallery();
  }

  function focusTile(slug) {
    tiles.forEach(function (tile) {
      if (tile.slug === slug) tile.link.focus({ preventScroll: true });
    });
  }

  /* ── Routage ───────────────────────────────────────────────────────── */

  function parseRoute() {
    var hash = window.location.hash.replace(/^#\/?/, '');

    if (hash === 'portfolio') return { view: 'portfolio' };
    if (hash === 'a-propos') return { view: 'about' };
    if (hash === 'services') return { view: 'services' };
    if (hash === 'contact') return { view: 'contact' };

    var match = /^projet\/(.+)$/.exec(hash);
    if (match) {
      var project = findProject(decodeURIComponent(match[1]));
      if (project) return { view: 'project', project: project };
    }

    return { view: 'home' };
  }

  function render() {
    var route = parseRoute();
    var view = route.view;
    var isHome = view === 'home';

    /* Position dans la galerie, pour y revenir au même endroit après avoir
       regardé un projet. */
    if (previousView === 'portfolio') galleryScrollY = window.scrollY;
    var backToGallery = view === 'portfolio' && previousView === 'project';

    if (view === 'home' || view === 'portfolio') indexView = view;
    if (view === 'project') setActive(route.project.slug);

    el.home.hidden = !isHome;
    el.pages.hidden = isHome;
    el.pages.classList.toggle('is-white', view === 'portfolio');
    el.portfolio.hidden = view !== 'portfolio';
    el.project.hidden = view !== 'project';
    el.about.hidden = view !== 'about';
    el.services.hidden = view !== 'services';
    el.contact.hidden = view !== 'contact';

    if (isHome) enterHome();
    if (view === 'portfolio') layoutGallery();
    if (view === 'project') renderProject(route.project);

    document.title = titleFor(route);
    markCurrentNav(view);

    document.body.dataset.dir = directionTo(view);
    replayAnimations(view);
    previousView = view;

    setMenu(false);
    if (booted) {
      window.scrollTo(0, backToGallery ? galleryScrollY : 0);
      if (backToGallery) focusTile(activeSlug);
      else focusHeading(view);
    }
    onWindowScroll();
  }

  /* De quel côté la vue doit-elle entrer ? */
  function directionTo(view) {
    if (previousView === null) return 'first';
    if (DEPTH[view] < DEPTH[previousView]) return 'back';
    return 'forward';
  }

  function titleFor(route) {
    if (route.view === 'project') return route.project.name + ' — ' + SITE_NAME;
    if (route.view === 'portfolio') return 'Portfolio — ' + SITE_NAME;
    if (route.view === 'about') return 'À propos — ' + SITE_NAME;
    if (route.view === 'services') return 'Services & tarifs — ' + SITE_NAME;
    if (route.view === 'contact') return 'Contact — ' + SITE_NAME;
    return SITE_NAME + ' — Cyrielle Lüdi, graphiste';
  }

  function markCurrentNav(view) {
    /* Une page projet fait partie du portfolio. L'accueil n'a pas d'entrée
       dans le menu : on y revient par le logo. */
    var current = view === 'about' ? '#/a-propos'
                : view === 'services' ? '#/services'
                : view === 'contact' ? '#/contact'
                : view === 'portfolio' || view === 'project' ? '#/portfolio'
                : null;

    var links = document.querySelectorAll('.nav__link');
    for (var i = 0; i < links.length; i++) {
      var isCurrent = links[i].getAttribute('href') === current;
      if (isCurrent) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
  }

  /* Rejoue les entrées animées à chaque changement de vue. */
  function viewElement(view) {
    return {
      home: el.home,
      portfolio: el.portfolio,
      project: el.project,
      about: el.about,
      services: el.services,
      contact: el.contact
    }[view];
  }

  function replayAnimations(view) {
    var scope = viewElement(view);
    var animated = scope.querySelectorAll('.anim');

    /* Une seule relecture de la mise en page pour tout relancer : la liste
       compte maintenant plusieurs dizaines d'entrées. */
    Array.prototype.forEach.call(animated, function (node) {
      node.style.animation = 'none';
    });
    void scope.offsetWidth;
    Array.prototype.forEach.call(animated, function (node) {
      node.style.animation = '';
    });
  }

  function focusHeading(view) {
    if (view === 'home') return;
    var heading = viewElement(view).querySelector('h1');
    if (heading) heading.focus({ preventScroll: true });
  }

  /* En-tête fixé en haut de l'écran : dès que la page défile, le logo se
     réduit et un filet sépare l'en-tête du contenu. */
  function onWindowScroll() {
    document.body.classList.toggle('is-scrolled', window.scrollY > 0);
  }

  /* ── Menu ──────────────────────────────────────────────────────────────
     Au téléphone, le menu est replié derrière un bouton ; ouvert, il couvre
     l'écran. Il se referme au choix d'une page, avec Échap, ou quand
     l'écran s'élargit.
     ───────────────────────────────────────────────────────────────────── */

  var compactLayout = window.matchMedia('(max-width: 860px)');
  var menuToggles = document.querySelectorAll('.menu-toggle');

  function isMenuOpen() {
    return document.body.classList.contains('is-menu-open');
  }

  function setMenu(open) {
    document.body.classList.toggle('is-menu-open', open);
    Array.prototype.forEach.call(menuToggles, function (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  function onMenuKeydown(e) {
    if (e.key !== 'Escape' || !isMenuOpen()) return;
    setMenu(false);

    /* Le focus revient au bouton visible (celui de la vue affichée). */
    Array.prototype.forEach.call(menuToggles, function (toggle) {
      if (toggle.getClientRects().length) toggle.focus();
    });
  }

  /* ── Carrousel ─────────────────────────────────────────────────────────
     Le projet sélectionné reste au centre de la liste. Molette, flèches,
     doigt ou clic sur un autre titre le font glisser jusqu'au centre ; un
     clic sur le titre centré ouvre le projet. Le survol ne sélectionne
     pas : le titre fuirait sous la souris et la liste s'emballerait.

     Au téléphone, la liste couvre toute la case du visuel, mais la
     sélection se fait au centre de la bande des titres, en bas de la case
     (--band, voir styles.css) ; au-dessus, les titres sont effacés.
     ───────────────────────────────────────────────────────────────────── */

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var WHEEL_STEP = 40;       // px de molette pour avancer d'un projet
  var WHEEL_COOLDOWN = 130;  // ms minimum entre deux pas

  var centered = -1;         // nœud au centre
  var pending = null;        // nœud visé par un défilement en cours
  var scrollFrame = 0;
  var settleTimer = 0;
  var touching = false;
  var wheelDelta = 0;
  var lastWheelAt = 0;
  var wheelLockedUntil = 0;
  var preloaded = {};

  /* Hauteur de la bande des titres, ou 0 quand toute la liste est visible. */
  function bandHeight() {
    return parseFloat(getComputedStyle(el.list).getPropertyValue('--band')) || 0;
  }

  /* Hauteur, dans la liste, du point où se fait la sélection. */
  function anchorY() {
    var height = el.list.clientHeight;
    var band = bandHeight();
    return band ? height - band / 2 : height / 2;
  }

  function target() {
    return pending !== null ? pending : centered;
  }

  function clampNode(k) {
    return Math.max(0, Math.min(nodes.length - 1, k));
  }

  /* Position de défilement qui amène le nœud k au point de sélection. */
  function topFor(k) {
    var li = nodes[k].li;
    return li.offsetTop + li.offsetHeight / 2 - anchorY();
  }

  function nodeAtCenter() {
    var first = nodes[0].li;
    var middle = el.list.scrollTop + anchorY();
    return clampNode(Math.round((middle - first.offsetTop - first.offsetHeight / 2) / first.offsetHeight));
  }

  function scrollToNode(k, instant) {
    var smooth = !instant && !reducedMotion.matches;
    pending = smooth ? k : null;
    el.list.scrollTo({ top: topFor(k), behavior: smooth ? 'smooth' : 'auto' });
    if (!smooth) markCentered(k);
    armSettle();
  }

  function step(direction) {
    var from = target();
    var to = clampNode(from + direction);
    if (to === from) return null;
    scrollToNode(to);
    return to;
  }

  /* Le nœud centré porte l'état actif (italique, flèche) et choisit le
     grand visuel. */
  function markCentered(k) {
    if (k === centered) return;
    if (centered >= 0) nodes[centered].li.classList.remove('is-active');
    centered = k;
    nodes[k].li.classList.add('is-active');
    setActive(nodes[k].project.slug);
  }

  function armSettle() {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, 160);
  }

  /* Défilement arrêté : on revient sans bruit dans la copie du milieu,
     identique à l'œil, pour que la boucle ne bute jamais sur un bord. */
  function settle() {
    if (touching) { armSettle(); return; }
    pending = null;
    if (el.home.hidden || centered < 0) return;

    var node = nodes[centered];
    if (node.copy !== MIDDLE) scrollToNode(MIDDLE * N + node.index, true);
  }

  /* À l'arrivée sur l'accueil : sélection centrée sans défilement visible,
     entrées en cascade à partir du centre. */
  function enterHome() {
    fitTitles();

    var index = Math.max(0, PROJECTS.indexOf(findProject(activeSlug)));
    var k = MIDDLE * N + index;

    nodes.forEach(function (node, j) {
      var distance = Math.abs(j - k);
      node.li.style.setProperty('--step', Math.min(distance, 8));
      node.li.classList.toggle('is-far', distance > 7);
    });

    scrollToNode(k, true);
  }

  function recenter() {
    if (el.home.hidden || centered < 0) return;
    scrollToNode(MIDDLE * N + nodes[centered].index, true);
  }

  function onListResize() {
    fitTitles();
    recenter();
  }

  /* Titres sur une seule ligne : ceux qui ne tiennent pas dans la colonne
     (flèche comprise quand ils passent au centre) sont réduits juste
     assez. La même réduction vaut au repos et au centre, pour qu'un titre
     grandisse toujours en arrivant au centre. */
  var measure = document.createElement('canvas').getContext('2d');

  function textWidth(font, text) {
    measure.font = font;
    return measure.measureText(text).width;
  }

  function fitTitles() {
    if (el.home.hidden) return;

    var link = nodes[MIDDLE * N].link;
    var width = link.clientWidth;
    if (!width) return;

    var root = getComputedStyle(document.documentElement);
    var size = parseFloat(root.getPropertyValue('--title')) || 19;
    var sizeActive = parseFloat(root.getPropertyValue('--title-active')) || 22;
    var family = getComputedStyle(link).fontFamily;
    var gap = parseFloat(getComputedStyle(link).columnGap) || 0;
    var arrow = parseFloat(getComputedStyle(link.querySelector('.project-link__go')).width) || 0;

    /* Quelques pixels de marge : l'italique déborde un peu de sa chasse. */
    var room = width - 4;
    var roomActive = width - gap - arrow - 4;

    PROJECTS.forEach(function (project, index) {
      var fit = Math.min(1,
        room / textWidth(size + 'px ' + family, project.name),
        roomActive / textWidth('italic 700 ' + sizeActive + 'px ' + family, project.name));

      for (var k = index; k < nodes.length; k += N) {
        nodes[k].li.style.setProperty('--fit', fit.toFixed(3));
      }
    });
  }

  /* Précharge les visuels voisins de la sélection : le fondu reste
     immédiat sans tout charger d'avance, même avec beaucoup de projets. */
  function preloadAround(index) {
    for (var d = -2; d <= 2; d++) {
      var cover = PROJECTS[(index + d + N) % N].cover;
      if (preloaded[cover]) continue;
      preloaded[cover] = true;
      new Image().src = cover;
    }
  }

  function onLinkClick(e, k) {
    if (e.detail === 0) return;  // Entrée : on ouvre

    /* Au téléphone, toucher le visuel (où les titres sont effacés) ouvre
       le projet présenté. */
    if (isUnderVisual(nodes[k].li)) {
      e.preventDefault();
      if (centered >= 0) window.location.hash = '#/projet/' + nodes[centered].project.slug;
      return;
    }

    if (k === target()) return;  // titre centré : on ouvre
    e.preventDefault();
    scrollToNode(k);
  }

  function isUnderVisual(li) {
    var band = bandHeight();
    if (!band) return false;
    var item = li.getBoundingClientRect();
    return item.top + item.height / 2 < el.list.getBoundingClientRect().bottom - band;
  }

  function onLinkFocus(index) {
    var t = target();
    if (t >= 0 && nodes[t].index === index) return;
    scrollToNode(MIDDLE * N + index);
  }

  /* Au clic, pas de focus : il recentrerait la liste avant que le clic ne
     soit traité, et un titre excentré s'ouvrirait au lieu de venir au
     centre. Le focus au clavier reste normal. */
  function onListMousedown(e) {
    if (e.target.closest('.project-link')) e.preventDefault();
  }

  function onWheel(e) {
    if (e.ctrlKey || !e.deltaY) return;  // ctrl + molette : zoom
    /* Balayage horizontal (deux doigts sur le trackpad) : on le laisse au
       navigateur, qui s'en sert pour revenir à la page précédente. */
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();

    var now = performance.now();
    if (now - lastWheelAt > 200) wheelDelta = 0;
    lastWheelAt = now;
    if (now < wheelLockedUntil) return;

    var unit = e.deltaMode === 1 ? 18 : e.deltaMode === 2 ? el.list.clientHeight : 1;
    wheelDelta += e.deltaY * unit;
    if (Math.abs(wheelDelta) < WHEEL_STEP) return;

    step(wheelDelta > 0 ? 1 : -1);
    wheelDelta = 0;
    wheelLockedUntil = now + WHEEL_COOLDOWN;
  }

  function onKeydown(e) {
    if (el.home.hidden || isMenuOpen()) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

    var direction = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!direction) return;

    e.preventDefault();
    var to = step(direction);

    /* Si le focus est dans la liste, il suit la sélection. */
    if (to !== null && el.list.contains(document.activeElement)) {
      nodes[MIDDLE * N + nodes[to].index].link.focus({ preventScroll: true });
    }
  }

  function onListScroll() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(syncToScroll);
    armSettle();
  }

  function syncToScroll() {
    scrollFrame = 0;
    if (el.home.hidden) return;
    markCentered(nodeAtCenter());
  }

  /* ── Démarrage ─────────────────────────────────────────────────────── */

  buildList();
  buildGallery();

  el.home.addEventListener('wheel', onWheel, { passive: false });
  el.list.addEventListener('scroll', onListScroll, { passive: true });
  el.list.addEventListener('mousedown', onListMousedown);
  el.list.addEventListener('touchstart', function () { touching = true; }, { passive: true });
  ['touchend', 'touchcancel'].forEach(function (type) {
    el.list.addEventListener(type, function () {
      touching = false;
      armSettle();
    }, { passive: true });
  });
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('keydown', onMenuKeydown);
  window.addEventListener('hashchange', render);
  window.addEventListener('scroll', onWindowScroll, { passive: true });

  Array.prototype.forEach.call(menuToggles, function (toggle) {
    toggle.addEventListener('click', function () { setMenu(!isMenuOpen()); });
  });
  /* Un lien du menu referme le menu, même vers la page déjà affichée. */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav__link')) setMenu(false);
  });

  compactLayout.addEventListener('change', function () {
    setMenu(false);
    if (!el.home.hidden) enterHome();
  });
  if (window.ResizeObserver) {
    new ResizeObserver(onListResize).observe(el.list);
    new ResizeObserver(onGalleryResize).observe(el.gallery);
  }
  /* Quand la police arrive, les titres changent de largeur et les
     légendes de hauteur : on recalcule. */
  if (document.fonts) {
    document.fonts.ready.then(function () {
      fitTitles();
      layoutGallery();
    });
  }

  setActive(DEFAULT_PROJECT);
  render();
  booted = true;
})();
