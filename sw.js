// Das Logbuch: hält das Spiel offline verfügbar. Bei Internet wird im Hintergrund die neuste Version geholt.
const C='logbuch-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(new URL(r.url).pathname.indexOf('/netzbau/')>=0)return; // Prim-Trainer liegt im Unterordner und wird immer frisch geladen
  e.respondWith(caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res;}).catch(()=>hit);return hit||net;})));});
