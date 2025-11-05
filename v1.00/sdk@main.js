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
(function banner(){ try { (console && console.log ? console.log : function(){})('[NextDev SDK] sdk aggregator loaded — credits: road.js & Next Dev Team'); } catch {} })();

export * as games from './games/index.js';
export * as ai from './ai/index.js';
export * as filter from './filter/index.js';
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
