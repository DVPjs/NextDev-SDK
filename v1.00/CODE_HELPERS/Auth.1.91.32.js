const BASE=(()=>{try{const u=new URL('.',import.meta.url);return `${u.protocol}//${u.host}`;}catch{return (typeof location!=='undefined')?location.origin:''}})();
const API_BASE=BASE;
function getUserToken(){
  try{if(globalThis.NEXTDEV_USER_TOKEN)return String(globalThis.NEXTDEV_USER_TOKEN)}catch{}
  try{if(globalThis.localStorage){const v=globalThis.localStorage.getItem('nextdev_user_token');if(v)return String(v)}}catch{}
  return '';
}
function setUserToken(token){
  try{globalThis.NEXTDEV_USER_TOKEN=String(token||'')}catch{}
  try{globalThis.localStorage&&globalThis.localStorage.setItem('nextdev_user_token',String(token||''))}catch{}
}
function getTenantToken(){
  try{if(globalThis.NEXTDEV_TENANT_TOKEN)return String(globalThis.NEXTDEV_TENANT_TOKEN)}catch{}
  try{if(globalThis.localStorage){const v=globalThis.localStorage.getItem('nextdev_tenant_token');if(v)return String(v)}}catch{}
  return '';
}
function setTenantToken(token){
  try{globalThis.NEXTDEV_TENANT_TOKEN=String(token||'')}catch{}
  try{globalThis.localStorage&&globalThis.localStorage.setItem('nextdev_tenant_token',String(token||''))}catch{}
}
function headers(requireAuth=true){
  const h={'Accept':'application/json','Content-Type':'application/json','X-SDK-Banner':'1'};
  try{const t=(globalThis&&globalThis.NEXTDEV_SDK_TOKEN)||'';if(requireAuth&&t)h['X-SDK-Auth']=t}catch{}
  const ut=getUserToken();
  if(ut){h['X-Auth-Token']=ut;h['Authorization']='Bearer '+ut}
  try{const origin=(typeof location!=='undefined'&&location.origin)?location.origin:'';if(origin)h['X-Auth-Domain']=origin}catch{}
  const tenant=getTenantToken();
  if(tenant){h['X-Custom-Auth']=tenant;h['X-Custom-Auth-Token']=tenant}
  return h
}
async function post(path,body,requireAuth=true){const r=await fetch(`${API_BASE}${path}`,{method:'POST',headers:headers(requireAuth),body:JSON.stringify(body||{})});const txt=await r.text();try{const j=JSON.parse(txt);return{ok:r.ok,status:r.status,json:j,text:txt}}catch{return{ok:r.ok,status:r.status,json:null,text:txt}}}
async function get(path,params,requireAuth=true){const url=new URL(`${API_BASE}${path}`);for(const[k,v]of Object.entries(params||{})){if(v!==undefined&&v!==null&&v!=='')url.searchParams.set(k,String(v))}const r=await fetch(url.toString(),{headers:headers(requireAuth)});const txt=await r.text();try{const j=JSON.parse(txt);return{ok:r.ok,status:r.status,json:j,text:txt}}catch{return{ok:r.ok,status:r.status,json:null,text:txt}}}
function extractField(form,selectors){for(const sel of selectors){const el=form.querySelector(sel);if(el){return String(el.value||'').trim()}}return ''}
function checkBranding(form){const expected='Powered by nextdev';try{const has=String(form.textContent||'').toLowerCase().includes(expected.toLowerCase());if(!has){console.warn(`[NextDev Auth SDK] branding missing; please include "${expected}" in your form.`)}}catch{}}
export async function config(){return get('/api/user-auth/config',{},false)}
export async function signup({email,username,password}){return post('/api/user-auth/signup',{email,username,password},false)}
export async function login({email,username,password,id}){return post('/api/user-auth/login',{email,username,password,id},false)}
export async function issueDomainToken(){
  const resp=await post('/api/user-auth/issue-domain-token',{},false);
  if(resp&&resp.ok&&resp.json&&resp.json.token){
    try{setTenantToken(resp.json.token)}catch{}
  }
  return resp;
}
export async function verifyEmail({email,code}){return post('/api/user-auth/verify-email',{email,code},false)}
export async function me(){return get('/api/user-auth/me',{},false)}
export async function guard(path){return get('/api/user-auth/guard',{path},false)}

export function attachFormHandlers({loginSelector='.nd-login-form',signupSelector='.nd-signup-form'}={},callbacks={}){
  try{
    const loginForm=document.querySelector(loginSelector)||null;
    const signupForm=document.querySelector(signupSelector)||null;
    if(loginForm){
      checkBranding(loginForm);
      loginForm.addEventListener('submit',async(e)=>{
        try{e.preventDefault();
          const email=extractField(loginForm,['.nd-email','[name="email"]']);
          const username=extractField(loginForm,['.nd-username','[name="username"]']);
          const password=extractField(loginForm,['.nd-password','[name="password"]']);
          const resp=await login({email,username,password});
          if(resp.ok&&resp.json&&resp.json.token){setUserToken(resp.json.token);callbacks.onLoginSuccess?callbacks.onLoginSuccess(resp.json):null}else{callbacks.onLoginError?callbacks.onLoginError(resp.json||resp.text):null}
        }catch(err){callbacks.onLoginError?callbacks.onLoginError({error:'login_failed',detail:String(err&&err.message||err)}):null}
      });
    }
    if(signupForm){
      checkBranding(signupForm);
      signupForm.addEventListener('submit',async(e)=>{
        try{e.preventDefault();
          const email=extractField(signupForm,['.nd-email','[name="email"]']);
          const username=extractField(signupForm,['.nd-username','[name="username"]']);
          const password=extractField(signupForm,['.nd-password','[name="password"]']);
          const resp=await signup({email,username,password});
          if(resp.ok&&resp.json){if(resp.json.token)setUserToken(resp.json.token);callbacks.onSignupSuccess?callbacks.onSignupSuccess(resp.json):null}else{callbacks.onSignupError?callbacks.onSignupError(resp.json||resp.text):null}
        }catch(err){callbacks.onSignupError?callbacks.onSignupError({error:'signup_failed',detail:String(err&&err.message||err)}):null}
      });
    }
  }catch(err){console.error('[NextDev Auth SDK] attachFormHandlers failed',err&&err.stack||err)}
}
export default { config, signup, login, verifyEmail, me, guard, attachFormHandlers, setUserToken, getUserToken, issueDomainToken };
export const setTenant=setTenantToken;
