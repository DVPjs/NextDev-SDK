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
(function banner(){ try { (console && console.log ? console.log : function(){})('[NextDev SDK] ai loaded — credits: road.js & Next Dev Team'); } catch {} })();
const BASE = (() => { try { const u = new URL('.', import.meta.url); return `${u.protocol}//${u.host}`; } catch { return (typeof location !== 'undefined') ? location.origin : ''; } })();
let __sdkToken = null;
const __authReady = (async function initAuth(){
  try { const url = new URL('/api/sdk/auth', BASE); url.searchParams.set('module','ai'); const r = await fetch(url.toString(), { method:'POST', headers:{ 'X-SDK-Banner':'1' } }); const j = await r.json().catch(()=>({})); if (j && j.token) { __sdkToken = j.token; } } catch {}
})();
function headers(format) {
  return { 'Content-Type': 'application/json', Accept: format === 'json' ? 'application/json' : 'text/plain', 'X-SDK-Auth': __sdkToken };
}
export async function chat({ model, text, messages = [], stream = false, format = 'json' } = {}) {
  await __authReady; if (!__sdkToken) throw new Error('NextDev SDK auth failed');
  if (!model) throw new Error('model is required');
  const body = JSON.stringify({ model, messages: messages.length ? messages : [{ role:'user', content: String(text||'') }], stream });
  const url = new URL('/api/ai/chat', BASE); url.searchParams.set('format', format);
  const resp = await fetch(url.toString(), { method:'POST', headers: headers(format), body });
  if (!resp.ok) { const t = await resp.text().catch(()=> ''); throw new Error(`AI request failed ${resp.status}: ${t}`); }
  return format === 'json' ? resp.json() : resp.text();
}
export async function web({ model, q, memoryId = '', persona = '', format = 'json' } = {}) {
  await __authReady; if (!__sdkToken) throw new Error('NextDev SDK auth failed');
  if (!model || !q) throw new Error('model and q are required');
  const url = new URL(`/api/v1/ai/${encodeURIComponent(model)}`, BASE);
  url.searchParams.set('qurry', q); if (memoryId) url.searchParams.set('memory-id', memoryId); if (persona) url.searchParams.set('peonana', persona); url.searchParams.set('format', format);
  const resp = await fetch(url.toString(), { headers: { Accept: format === 'json' ? 'application/json' : 'text/plain', 'X-SDK-Auth': __sdkToken } });
  if (!resp.ok) { const t = await resp.text().catch(()=> ''); throw new Error(`AI web failed ${resp.status}: ${t}`); }
  return format === 'json' ? resp.json() : resp.text();
}
export default { chat, web };
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
