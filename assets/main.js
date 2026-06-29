// STOLBASZ — drobna interaktywność (nav mobile + reveal)
(function () {
  // mobilne menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // reveal przy scrollu
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// nav kondensuje się po przewinięciu (cienka linia + niższy pasek) — addytywne, lekkie
(function () {
  var nav = document.querySelector('.nav') || document.querySelector('header');
  if (!nav) return;
  var ticking = false;
  function upd() { nav.classList.toggle('is-stuck', window.scrollY > 24); ticking = false; }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(upd); }
  }, { passive: true });
  upd();
})();

/* === rodzina: gastro === */
/* === rodzina GASTRO: nav jak Nobu - JEDEN kontroler stanu (koniec wyścigu z base.js is-stuck).
   - sama GÓRA (y<=TOP): przezroczysty overlay nad hero (bez nav-solid, bez nav-hidden)
   - scroll w DÓŁ: chowa OD RAZU (.nav-hidden)
   - scroll w GÓRĘ: pokazuje lity krem (.nav-solid)
   Histereza (TH) = brak migania. is-stuck z base.js jest wizualnie zneutralizowane w gastro.css. === */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.scrollY || 0;
  var TOP = 8;   // "sama góra" -> przezroczysty overlay nad hero
  var TH = 6;    // martwa strefa na mikro-ruch (anty-miganie)
  var ticking = false;
  function upd() {
    var y = window.scrollY || 0;
    if (y <= TOP) {
      nav.classList.remove('nav-hidden', 'nav-solid');   // góra: przezroczysty, widoczny
      last = y; ticking = false; return;
    }
    var d = y - last;
    if (Math.abs(d) <= TH) { ticking = false; return; }  // ignoruj mikro-ruch (stabilność)
    if (d > 0) {
      nav.classList.add('nav-hidden');                   // w DÓŁ -> chowaj
    } else {
      nav.classList.remove('nav-hidden');
      nav.classList.add('nav-solid');                    // w GÓRĘ -> pokaż lity
    }
    last = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(upd); }
  }, { passive: true });
  upd();
})();

/* === licznik otwarć demo (buy-signal) === */
(function(){try{if(String(location.protocol).indexOf('http')!==0)return;if(sessionStorage.getItem('_dv'))return;sessionStorage.setItem('_dv','1');var seg=(location.pathname.split('/').filter(Boolean)[0])||'';var base=location.origin+(seg?('/'+seg):'');fetch('https://zngfubfinbojfgaxdrbf.supabase.co/rest/v1/demo_views',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json','apikey':'sb_publishable_MWwoyGlSCWnJ4awtOPF0ow_ZVS0Y8qK','Authorization':'Bearer sb_publishable_MWwoyGlSCWnJ4awtOPF0ow_ZVS0Y8qK','Prefer':'return=minimal'},body:JSON.stringify({demo_url:base,page:location.pathname,referrer:(document.referrer||null)})}).catch(function(){});}catch(e){}})();
