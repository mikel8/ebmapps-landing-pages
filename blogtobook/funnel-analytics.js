(function(){
 const token='phc_qehuetKPrvabKezGmQSNJQXD8NGv2htMWq5sqix6JSDp',key='btb_funnel_v1',valid=x=>/^[0-9a-f-]{36}$/i.test(x||'');
 const safe=x=>String(x||'').replace(/[^a-zA-Z0-9._-]/g,'').slice(0,80);
 const params=new URLSearchParams(location.search), fragment=new URLSearchParams(location.hash.slice(1));
 let state={};try{state=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
 if(fragment.get('btb_id')&&valid(fragment.get('btb_id')))state.id=fragment.get('btb_id');
 if(fragment.get('btb_internal')==='1'||params.get('btb_internal')==='1')state.internal=true;
 if(!valid(state.id))state.id=crypto.randomUUID();
 if(fragment.has('btb_source')){state.source=safe(fragment.get('btb_source'));state.medium=safe(fragment.get('btb_medium'));state.campaign=safe(fragment.get('btb_campaign'))}
 if(!state.source){let ref='direct';try{ref=document.referrer?new URL(document.referrer).hostname:'direct'}catch{};state.source=safe(params.get('utm_source')||ref);state.medium=safe(params.get('utm_medium'));state.campaign=safe(params.get('utm_campaign'))}
 try{localStorage.setItem(key,JSON.stringify(state))}catch{}
 if(fragment.has('btb_id')||fragment.has('btb_internal'))history.replaceState(null,'',location.pathname+location.search);
 const base={app_name:'BlogToBook',tracking_version:'funnel_v1',traffic_class:state.internal?'internal':'external',source:state.source,medium:state.medium||'',campaign:state.campaign||'',surface:location.hostname==='blogtobook.fly.dev'?'web':'landing_page'};
 window.btbTelemetry={state,capture(event,extra={}){if(state.internal)return;const body=JSON.stringify({api_key:token,event,properties:{distinct_id:state.id,...base,...extra}});try{fetch('https://us.i.posthog.com/i/v0/e/',{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true,referrerPolicy:'no-referrer'}).catch(()=>{})}catch{}},link(url){const u=new URL(url);const f=new URLSearchParams();f.set('btb_id',state.id);if(state.internal)f.set('btb_internal','1');f.set('btb_source',state.source||'direct');f.set('btb_medium',state.medium||'');f.set('btb_campaign',state.campaign||'');u.hash=f.toString();return u.toString()}};
})();
