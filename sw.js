// 설치(PWA)용 서비스 워커(10-18 "크롬에서 바로가기 말고 설치되게"). 지인 테스트 링크(GitHub Pages)에서만 켬(main.js, 개발 서버에서는 안 씀).
// 페이지·스크립트·스타일 = 네트워크 먼저(새로 올리면 바로 새 판), 안 되면 저장해 둔 것. 그림·글꼴 = 저장해 둔 것 먼저(빠르게)
const CACHE = 'yeonma4-1792924476074';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isArt = /\/(img|fonts|icons)\//.test(req.url);
  e.respondWith(isArt
    ? caches.match(req).then(hit => hit || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(req, c)); return res; }))
    : fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(req, c)); return res; }).catch(() => caches.match(req)));
});
