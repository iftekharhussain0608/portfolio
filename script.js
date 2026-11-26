(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Nav: solid background once scrolled ----
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  var menuBtn = document.getElementById('menuToggle');
  var links = document.getElementById('navlinks');
  function closeMenu() {
    if (!links) return;
    links.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Active section in nav ----
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navAnchors.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---- Cursor spotlight on cards ----
  if (!reduceMotion) {
    document.querySelectorAll('.spot').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // ---- Count-up numbers ----
  var counters = document.querySelectorAll('[data-count]');
  function fmt(n) { return n.toLocaleString('en-US'); }
  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduceMotion && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  // ---- Draft badge: only appears while placeholders or unapproved copy remain ----
  var todos = document.querySelectorAll('[data-todo]').length;
  var drafts = Array.prototype.map.call(document.querySelectorAll('[data-draft]'), function (el) {
    return el.getAttribute('data-draft');
  });
  if (todos || drafts.length) {
    var pill = document.createElement('div');
    pill.className = 'draft-pill';
    pill.setAttribute('role', 'status');
    pill.innerHTML = '<b>DRAFT</b><span>' + todos + ' placeholder' + (todos === 1 ? '' : 's') +
      (drafts.length ? ' · awaiting approval: ' + drafts.join(', ') : '') + '</span>';
    document.body.appendChild(pill);
  }

  // ---- Footer year ----
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
