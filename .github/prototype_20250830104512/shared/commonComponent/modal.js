(function(G){
  const openModals = {};
  function open(id, opts){
    close(id);
    const ov = document.createElement('div');
    ov.className='modal-overlay animate-fade';
    ov.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="close-x" data-close>&#10005;</div>
        <header>${opts.title||'Modal'}</header>
        <div class="modal-body">${opts.body||''}</div>
        <div class="modal-actions" style="display:flex; gap:8px; justify-content:flex-end;">
          ${(opts.actions||[]).map(a=>`<button data-action="${a.key}" class="${a.variant||''}">${a.label}</button>`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(ov);
    openModals[id]=ov;
    ov.addEventListener('click', e=>{
      if(e.target===ov || e.target.closest('[data-close]')) close(id);
    });
    ov.querySelectorAll('[data-action]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const key = btn.getAttribute('data-action');
        const action = (opts.actions||[]).find(a=>a.key===key);
        action && action.onClick && action.onClick({ close:()=>close(id) });
      });
    });
  }
  function close(id){
    if(openModals[id]){
      openModals[id].remove();
      delete openModals[id];
    }
  }
  window.addEventListener('keydown', e=>{
    if(e.key==='Escape'){
      Object.keys(openModals).forEach(close);
    }
  });
  G.Modal = { open, close };
})(window.GMS);
