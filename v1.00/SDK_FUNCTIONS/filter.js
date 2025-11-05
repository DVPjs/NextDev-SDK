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
(function banner(){ try { (console && console.log ? console.log : function(){})('[NextDev SDK] filter loaded — credits: road.js & Next Dev Team'); } catch {} })();
const BASE = (() => { try { const u = new URL('.', import.meta.url); return `${u.protocol}//${u.host}`; } catch { return (typeof location !== 'undefined') ? location.origin : ''; } })();
let __sdkToken = null;
const __authReady = (async function initAuth(){
  try { const url = new URL('/api/sdk/auth', BASE); url.searchParams.set('module','filter'); const r = await fetch(url.toString(), { method:'POST', headers:{ 'X-SDK-Banner':'1' } }); const j = await r.json().catch(()=>({})); if (j && j.token) { __sdkToken = j.token; } } catch {}
})();
async function request(path, payload = {}, format = 'json') {
  await __authReady; if (!__sdkToken) throw new Error('NextDev SDK auth failed');
  const url = new URL(path, BASE); url.searchParams.set('format', format);
  const resp = await fetch(url.toString(), { method:'POST', headers: { 'Content-Type': 'application/json', Accept: format === 'json' ? 'application/json' : 'text/plain', 'X-SDK-Auth': __sdkToken }, body: JSON.stringify(payload) });
  if (!resp.ok) { const t = await resp.text().catch(()=> ''); throw new Error(`Filter request failed ${resp.status}: ${t}`); }
  return format === 'json' ? resp.json() : resp.text();
}
export async function check({ text, format = 'json' } = {}) {
  if (!text) throw new Error('text is required');
  return request('/api/filter/check', { text }, format);
}
export async function checkWithType({ text, type, format = 'json' } = {}) {
  if (!text || !type) throw new Error('text and type are required');
  return request('/api/filter/check', { text, type }, format);
}
export default { check, checkWithType };
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
