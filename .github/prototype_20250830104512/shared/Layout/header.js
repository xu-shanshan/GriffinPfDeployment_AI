(function(G){
  function renderHeader(){
    const header = document.createElement('header');
    header.className='layout-header';
    header.innerHTML = `
      <strong>Griffin Deployment Prototype</strong>
      <div style="margin-left:auto; display:flex; gap:12px; align-items:center;">
        <span class="text-dim" data-role-badge></span>
        <button class="secondary" data-open-settings>Settings</button>
        <div style="font-size:12px; color:var(--text-dim);">${G.state.currentUser.name}</div>
      </div>
    `;
    header.querySelector('[data-open-settings]').addEventListener('click', ()=>{
      window.location.href='settings.html';
    });
    header.querySelector('[data-role-badge]').textContent = G.state.currentUser.roles.join(', ');
    return header;
  }
  G.Layout = G.Layout || {};
  G.Layout.renderHeader = renderHeader;
})(window.GMS);
