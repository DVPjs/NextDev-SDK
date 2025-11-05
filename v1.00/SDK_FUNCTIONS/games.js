// NextDev Public ESM SDK — Unified Access Layer
// Developed by "road.js" and the "NextDev Team"
// QUICK START:
// import { games } from `${origin}/Nextdev/sdk@main.js`;
// const res = await games.list({ q: 'arcade' });
// Alternate Import:
// import * as sdk from `${origin}/Nextdev/sdk@main.js`;
// const { games, ai, filter } = sdk;
//
// Origin: sdk.nxtjs.dev
// Website: nxtjs.dev
// Discord: discord.gg/UaN6geq8be
//
// All rights reserved © 2025 NextDev
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
(function banner(){
  try {
    const msg = '[NextDev SDK] games loaded — credits: road.js & Next Dev Team';
    (console && console.log ? console.log : function(){])(msg);
  } catch {}
})();
const BASE = (() => {
  try { const u = new URL('.', import.meta.url); return `${u.protocol}//${u.host}`; } catch { return (typeof location !== 'undefined') ? location.origin : ''; }
})();
let __sdkToken = null;
const __authReady = (async function initAuth(){
  try {
    const url = new URL('/api/sdk/auth', BASE); url.searchParams.set('module','games');
    const r = await fetch(url.toString(), { method:'POST', headers:{ 'X-SDK-Banner':'1' } });
    const j = await r.json().catch(()=>({}));
    if (j && j.token) { __sdkToken = j.token; }
  } catch {}
})();
function buildUrl(path, params = {}) {
  const url = new URL(path, BASE);
  for (const [k, v] of Object.entries(params)) { if (v === undefined || v === null || v === '') continue; url.searchParams.set(k, String(v)); }
  return url.toString();
}
async function request(path, params = {}, format = 'json') {
  await __authReady;
  if (!__sdkToken) throw new Error('NextDev SDK auth failed');
  const url = buildUrl(path, { ...params, format });
  const headers = { Accept: format === 'json' ? 'application/json' : 'text/plain', 'X-SDK-Auth': __sdkToken };
  const resp = await fetch(url, { headers });
  if (!resp.ok) { const text = await resp.text().catch(()=> ''); throw new Error(`Request failed ${resp.status}: ${text}`); }
  return format === 'json' ? resp.json() : resp.text();
}
export async function search({ q = '', page = 1, limit = 50, format = 'json' } = {}) {
  return request('/api/games', { q, page, limit }, format);
}
export async function popular({ page = 1, limit = 20, format = 'json' } = {}) {
  const data = await request('/api/games/remote', { page, limit }, 'json');
  return format === 'json' ? data : JSON.stringify(data, null, 2);
}
export async function info({ q = '', format = 'json' } = {}) {
  const res = await request('/api/games/remote', { q, page: 1, limit: 1 }, 'json');
  const item = res && res.items && res.items[0] ? res.items[0] : null;
  if (format !== 'json') return JSON.stringify(item, null, 2);
  return item;
}
export function viewUrl(md5) {
  if (!md5) throw new Error('md5 is required');
  return buildUrl(`/api/games/play/${encodeURIComponent(md5)}`);
}
export default { search, popular, info, viewUrl };
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
