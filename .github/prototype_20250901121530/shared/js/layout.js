(function(){
  var ACTIVE = (window.APP_ACTIVE_PAGE||'').toLowerCase();
  function icon(name){ return `<i data-feather="${name}" class="fluent-icon" aria-hidden="true"></i>`; }
  function injectSidebar(){
    var host = document.getElementById('app-sidebar'); if(!host) return;
    host.innerHTML = `
      <aside class="fluent-sidebar-root" role="navigation" aria-label="Primary">
        <div class="fluent-sidebar-header">
          <div class="fluent-brand-icon">${icon('layers')}</div>
          <div>
            <div style="font-weight:600;">Griffin PF AI</div>
            <div class="fluent-text-caption1">Prototype</div>
          </div>
        </div>
        <nav class="fluent-sidebar-section">
          <div class="fluent-sidebar-section-title">MAIN NAVIGATION</div>
          <a href="dashboard.html" class="fluent-sidebar-nav-item  ${ACTIVE==='dashboard'?'active':''}">${icon('home')}<span>Dashboard</span></a>
          <a href="#" class="fluent-sidebar-nav-item " aria-disabled="true">${icon('server')}<span>VE Management</span></a>
          <a href="#" class="fluent-sidebar-nav-item " aria-disabled="true">${icon('layers')}<span>Services</span></a>
        </nav>
        <div class="fluent-sidebar-section">
          <div class="fluent-sidebar-section-title">QUICK ACCESS</div>
          <div id="sidebarFavorites" class="fluent-text-caption1" style="padding:0 16px;">(empty)</div>
        </div>
      </aside>`;
    if(window.feather) feather.replace();
  }
  function injectHeader(opts){
    var host = document.getElementById('app-header'); if(!host) return;
    opts = opts||{};
    host.innerHTML = `
      <header class="fluent-header-bar" role="banner">
        <div class="web-container fluent-header-inner">
          <div>
            <h1 class="fluent-text-title2 page-title" id="pageTitle">${opts.title||''}</h1>
            ${opts.subtitle?`<div class="fluent-text-caption1">${opts.subtitle}</div>`:''}
          </div>
          <div class="fluent-user-profile" aria-label="User">
            <div class="fluent-user-avatar">${icon('user')}</div>
            <span class="fluent-text-caption1">Prototype User</span>
          </div>
        </div>
      </header>`;
    if(window.feather) feather.replace();
  }
  window.injectSidebar = injectSidebar;
  window.injectHeader = injectHeader;
})();
