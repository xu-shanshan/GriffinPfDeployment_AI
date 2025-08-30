window.GMS = (function(){
  const topics = {};
  function pub(topic, data){ (topics[topic]||[]).forEach(fn=>fn(data)); }
  function sub(topic, fn){ topics[topic] = topics[topic]||[]; topics[topic].push(fn); return ()=>topics[topic]=topics[topic].filter(f=>f!==fn); }
  const qs = (sel, ctx=document)=>ctx.querySelector(sel);
  const qsa = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));
  function h(tag, attrs={}, children=[]) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=>{
      if(k.startsWith('on') && typeof v==='function') el.addEventListener(k.substring(2).toLowerCase(), v);
      else if(v!=null) el.setAttribute(k,v);
    });
    (Array.isArray(children)?children:[children]).filter(Boolean).forEach(c=>{
      el.appendChild(typeof c==='string'?document.createTextNode(c):c);
    });
    return el;
  }
  function formatDate(ts){ const d=new Date(ts); return d.toLocaleString(); }
  function noop(){}
  function delegate(root, selector, event, handler){
    root.addEventListener(event, e=>{
      const match = e.target.closest(selector);
      if(match && root.contains(match)) handler(e, match);
    });
  }
  const state = {
    currentUser: { name:'demoUser', roles:['Operator'], claims:['AME\\demoUser'] },
    allowedClaims: ['AME\\M365-SovFleet','AME\\xushanshan','AME\\demoUser']
  };
  function canDeploy(){ return state.currentUser.roles.includes('Admin')
      || state.allowedClaims.some(c=>state.currentUser.claims.includes(c)); }
  return { pub, sub, qs, qsa, h, formatDate, delegate, state, canDeploy };
})();
