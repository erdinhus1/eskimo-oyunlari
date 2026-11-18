import '@google/model-viewer';
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { comics, models, books, videos, i18n } from './data.js';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

let lang = 'tr';
try { lang = localStorage.getItem('lang') || ((navigator.language || 'tr').startsWith('tr') ? 'tr' : 'en'); } catch {}
let tab = 'home';
let modelId = models[0].id;

const $ = (s) => document.querySelector(s);
const view = $('#view'), overlay = $('#overlay');
const T = (k) => i18n[lang][k];
const L = (o) => (o && (o[lang] || o.tr)) || '';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const tabs = [
  ['home', '🏠', 'home'], ['comics', '📖', 'comics'], ['models', '🧊', 'models'], ['books', '📚', 'books'],
];

function renderChrome() {
  document.documentElement.lang = lang;
  $('#title').textContent = '❄ ' + T('appTitle');
  $('#lang').textContent = lang === 'tr' ? 'EN' : 'TR';
  $('#tabs').innerHTML = tabs.map(([id, ic, k]) =>
    `<button data-tab="${id}" class="${tab === id ? 'on' : ''}"><span class="ic">${ic}</span>${esc(T(k))}</button>`).join('');
}

function renderView() {
  renderChrome();
  view.scrollTop = 0;
  if (tab === 'home') return home();
  if (tab === 'comics') return comicsView();
  if (tab === 'models') return modelsView();
  if (tab === 'books') return booksView();
}

function home() {
  view.innerHTML = `
    <section class="hero"><h2>${T('heroTitle')}</h2><p>${T('heroText')}</p></section>
    <div class="stats">
      <div class="stat"><b>137</b><span>${T('stGames')}</span></div>
      <div class="stat"><b>${comics.length}</b><span>${T('stComics')}</span></div>
      <div class="stat"><b>${models.length}</b><span>${T('stModels')}</span></div>
      <div class="stat"><b>${books.length}</b><span>${T('stBooks')}</span></div>
    </div>
    <section class="panel"><h3>${T('summaryT')}</h3><p>${T('summary')}</p></section>
    <section class="panel"><h3>${T('resultT')}</h3><p>${T('result')}</p></section>
    ${videos.length ? `<section class="panel"><h3>${T('videosT')}</h3>${videos.map((v) => `<a class="link" href="${esc(v.url)}" target="_blank" rel="noopener">▶ ${esc(L(v.title))}</a><br>`).join('')}</section>` : ''}
    <section class="panel"><a class="link" href="https://inuit.tr" target="_blank" rel="noopener">🌐 ${T('site')}</a></section>`;
}

function comicsView() {
  view.innerHTML = `<div class="grid">${comics.map((c, i) => `
    <button class="tile" data-comic="${i}">
      <img src="${c.file}" alt="${esc(c.title)}" loading="lazy" />
      <div class="t"><b>${esc(c.title)}</b><small>${esc(c.sub ? L(c.sub) : T('tools') + ': ' + L(c.tools))}</small></div>
    </button>`).join('')}</div>`;
}

function modelsView() {
  const m = models.find((x) => x.id === modelId) || models[0];
  view.innerHTML = `<div class="models-wrap">
    <div class="chips">${models.map((x) => `<button data-model="${x.id}" class="${x.id === m.id ? 'on' : ''}">${x.icon} ${esc(x.title)}</button>`).join('')}</div>
    <model-viewer id="mv" src="${m.file}" alt="${esc(m.title)}" camera-controls auto-rotate auto-rotate-delay="1500" touch-action="pan-y" shadow-intensity="1" exposure="1.1"></model-viewer>
    <p class="hint">${T('modelHint')}</p></div>`;
  const mv = $('#mv');
  mv.addEventListener('error', () => { mv.insertAdjacentHTML('afterend', `<p class="msg">${T('modelError')}</p>`); });
}

function booksView() {
  view.innerHTML = `<div class="books">${books.map((b, i) => `
    <button class="book" data-book="${i}"><div class="cover">📕</div>
      <div><b>${esc(L(b.title))}</b><small>${esc(L(b.desc))}</small></div></button>`).join('')}</div>`;
}

// ---------- Overlay'ler ----------
function openOverlay(html) { if (overlay.hidden) history.pushState({ ov: 1 }, ''); overlay.innerHTML = html; overlay.hidden = false; }
function closeOverlay() { if (overlay.hidden) return false; overlay.hidden = true; overlay.innerHTML = ''; return true; }

function openComic(i) {
  const c = comics[i]; let zoom = 1;
  openOverlay(`<div class="ov-bar"><div class="ttl">${esc(c.title)}</div><button data-act="zm">−</button><button data-act="zp">＋</button><button data-act="close">✕</button></div>
    <div class="ov-body" id="ovb"><img id="ovi" src="${c.file}" alt="${esc(c.title)}"></div>
    <div class="ov-foot"><button data-act="prev">‹</button><span>${i + 1} / ${comics.length}</span><button data-act="next">›</button></div>`);
  const img = $('#ovi');
  const apply = () => { img.style.width = zoom * 100 + '%'; };
  let sx = 0;
  overlay.onclick = (e) => {
    const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return;
    if (a === 'close') history.back();
    if (a === 'zp') { zoom = Math.min(4, zoom + .5); apply(); }
    if (a === 'zm') { zoom = Math.max(1, zoom - .5); apply(); }
    if (a === 'prev' && i > 0) { openComic(i - 1); }
    if (a === 'next' && i < comics.length - 1) { openComic(i + 1); }
  };
  const body = $('#ovb');
  body.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  body.addEventListener('touchend', (e) => {
    if (zoom > 1 || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 80) { const n = i + (dx < 0 ? 1 : -1); if (n >= 0 && n < comics.length) { openComic(n); } }
  }, { passive: true });
  // iki parmakla yakınlaştırma
  let d0 = 0, z0 = 1;
  body.addEventListener('touchstart', (e) => { if (e.touches.length === 2) { d0 = dist(e); z0 = zoom; } }, { passive: true });
  body.addEventListener('touchmove', (e) => { if (e.touches.length === 2 && d0) { zoom = Math.max(1, Math.min(4, z0 * dist(e) / d0)); apply(); } }, { passive: true });
  body.addEventListener('touchend', () => { d0 = 0; }, { passive: true });
}
const dist = (e) => Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

async function openBook(i) {
  const b = books[i]; let doc, n = 1, scale = 1, busy = false, pend = 0;
  openOverlay(`<div class="ov-bar"><div class="ttl">${esc(L(b.title))}</div><button data-act="zm">−</button><button data-act="zp">＋</button><button data-act="close">✕</button></div>
    <div class="ov-body" id="ovb"><div class="msg">${T('loading')}</div></div>
    <div class="ov-foot"><button data-act="prev">‹</button><span id="pg">–</span><button data-act="next">›</button></div>`);
  const body = $('#ovb');
  async function draw() {
    if (busy) { pend = 1; return; }
    busy = true;
    try {
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const fit = (body.clientWidth - 16) / base.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: fit * scale * dpr });
      const cv = document.createElement('canvas');
      cv.width = vp.width; cv.height = vp.height;
      cv.style.width = vp.width / dpr + 'px'; cv.style.height = vp.height / dpr + 'px';
      await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
      body.replaceChildren(cv); body.scrollTop = 0;
      $('#pg').textContent = `${T('page')} ${n} / ${doc.numPages}`;
    } finally { busy = false; if (pend) { pend = 0; draw(); } }
  }
  overlay.onclick = (e) => {
    const a = e.target.closest('[data-act]')?.dataset.act; if (!a || !doc) { if (a === 'close') history.back(); return; }
    if (a === 'close') history.back();
    if (a === 'prev' && n > 1) { n--; draw(); }
    if (a === 'next' && n < doc.numPages) { n++; draw(); }
    if (a === 'zp') { scale = Math.min(4, scale + .5); draw(); }
    if (a === 'zm') { scale = Math.max(1, scale - .5); draw(); }
  };
  try { doc = await pdfjs.getDocument({ url: b.file }).promise; await draw(); }
  catch (err) { console.error(err); body.innerHTML = `<div class="msg">${T('pdfError')}</div>`; }
}

// ---------- Olaylar ----------
document.addEventListener('click', (e) => {
  const t = e.target.closest('button'); if (!t || overlay.contains(t)) return;
  if (t.dataset.tab) { tab = t.dataset.tab; renderView(); }
  else if (t.id === 'lang') { lang = lang === 'tr' ? 'en' : 'tr'; try { localStorage.setItem('lang', lang); } catch {} renderView(); }
  else if (t.dataset.comic) openComic(+t.dataset.comic);
  else if (t.dataset.model) { modelId = t.dataset.model; modelsView(); }
  else if (t.dataset.book) openBook(+t.dataset.book);
});
window.addEventListener('popstate', () => { if (!overlay.hidden) { overlay.hidden = true; overlay.innerHTML = ''; } });

renderView();
