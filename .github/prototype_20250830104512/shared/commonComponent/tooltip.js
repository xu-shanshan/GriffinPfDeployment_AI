(function(G){
  let tip;
  function ensure(){
    if(!tip){
      tip = document.createElement('div');
      tip.className='tooltip';
      document.body.appendChild(tip);
    }
  }
  function show(el, text){
    ensure();
    tip.textContent = text;
    const r = el.getBoundingClientRect();
    tip.style.top = (window.scrollY + r.top - 8)+'px';
    tip.style.left = (window.scrollX + r.left + r.width/2)+'px';
    tip.style.display='block';
  }
  function hide(){ if(tip) tip.style.display='none'; }
  function bind(root=document){
    root.addEventListener('mouseover', e=>{
      const t = e.target.closest('[data-tooltip]');
      if(t) show(t, t.getAttribute('data-tooltip'));
    });
    root.addEventListener('mouseout', e=>{
      if(e.target.closest('[data-tooltip]')) hide();
    });
  }
  bind();
  G.Tooltip = { show, hide };
})(window.GMS);
