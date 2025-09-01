(function(){
  var ACTIVE = (window.APP_ACTIVE_PAGE||'').toLowerCase();
  function icon(name){ return `<i data-feather="${name}" class="fluent-icon" aria-hidden="true"></i>`; }

  function navLink(href,label,key,ico){
    var active = ACTIVE===key;
    return `<a href="${href}" class="fluent-sidebar-nav-item ${active?'active':''}" ${active?'aria-current="page"':''}>
      ${icon(ico||'circle')}<span class="fluent-truncate">${label}</span>
    </a>`;
  }

  function injectSidebar(){
    var host = document.getElementById('app-sidebar'); if(!host) return;
    host.innerHTML = `
      <aside class="fluent-sidebar-root" role="navigation" aria-label="Primary">
        <div class="fluent-sidebar-header">
          <button type="button" id="fluentSidebarToggle" class="fluent-sidebar-toggle" aria-label="Toggle sidebar" aria-pressed="false">
            ${icon('chevron-left')}
          </button>
          <div class="fluent-brand-icon">${icon('layers')}</div>
          <div>
            <div style="font-weight:600;">Griffin PF AI</div>
            <div class="fluent-text-caption1">Prototype</div>
          </div>
        </div>
        <nav class="fluent-sidebar-section" aria-label="Main navigation">
          <div class="fluent-sidebar-section-title">MAIN NAVIGATION</div>
          ${navLink('dashboard.html','Dashboard','dashboard','home')}
          ${navLink('#','VE Management','ve','server')}
          ${navLink('#','Services','services','layers')}
        </nav>
        <div class="fluent-sidebar-section" aria-label="Quick access favorites">
          <div class="fluent-sidebar-section-title">QUICK ACCESS</div>
          <div id="fluent-sidebar-favorites" class="fluent-text-caption1" style="padding:0 16px;opacity:.6;">(empty)</div>
        </div>
      </aside>`;
    bindSidebarToggle();
    if(window.feather) feather.replace();
  }

  function bindSidebarToggle(){
    var btn = document.getElementById('fluentSidebarToggle');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var collapsed = document.body.classList.toggle('sidebar-collapsed');
      btn.setAttribute('aria-pressed', collapsed?'true':'false');
    });
  }

  function buildFavLink(item){
    var href = item.type==='service'
      ? `service-detail.html?service=${encodeURIComponent(item.name)}`
      : `ve-detail.html?ve=${encodeURIComponent(item.name)}`;
    var ic = item.type==='service'?'package':'server';
    return `<a href="${href}" class="fluent-sidebar-nav-item" data-fav-type="${item.type}">
      ${icon(ic)}<span class="fluent-truncate">${item.name}</span>
    </a>`;
  }

  function syncSidebarFavorites(veList, svcList){
    var el = document.getElementById('fluent-sidebar-favorites');
    if(!el) return;
    var combined = []
      .concat((veList||[]).map(function(v){ return { name:(v.name||v), type:'ve'}; }))
      .concat((svcList||[]).map(function(s){ return { name:(s.name||s), type:'service'}; }));
    var MAX = 6;
    combined = combined.slice(0, MAX);
    if(!combined.length){
      el.style.opacity='.6';
      el.innerHTML='(empty)';
      return;
    }
    el.style.opacity='1';
    el.innerHTML = combined.map(buildFavLink).join('');
    if(window.feather) feather.replace();
  }

  function injectHeader(opts){
    var host = document.getElementById('app-header'); if(!host) return;
    opts = opts||{};
    host.innerHTML = `
      <header class="fluent-header-bar" role="banner">
        <div class="fluent-web-container fluent-header-inner">
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

  // Optional helper to change active nav dynamically
  function setActiveNav(key){
    ACTIVE = (key||'').toLowerCase();
    var navHost = document.querySelector('.fluent-sidebar-root nav');
    if(!navHost) return;
    navHost.querySelectorAll('.fluent-sidebar-nav-item').forEach(function(a){
      var text = a.textContent.trim().toLowerCase();
      var match = text.indexOf(ACTIVE) > -1 || a.getAttribute('href')?.toLowerCase().indexOf(ACTIVE) > -1;
      a.classList.toggle('active', match);
      if(match) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  }

  window.injectSidebar = injectSidebar;
  window.injectHeader = injectHeader;
  window.syncSidebarFavorites = syncSidebarFavorites;
  window.setActiveNav = setActiveNav;
})();
