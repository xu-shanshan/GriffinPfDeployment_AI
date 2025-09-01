(function(){
  function sidebarTemplate(active){
    function nav(href, icon, label, key){
      var is = active===key ? ' active' : '';
      var ac = active===key ? ' aria-current="page"' : '';
      return `<a href="${href}" class="sidebar-nav-item${is}" data-nav="${key}"${ac}>
        <i data-feather="${icon}" class="fluent-icon mr-3" aria-hidden="true"></i>${label}
      </a>`;
    }
    return `<aside class="sidebar-root" role="navigation" aria-label="Main navigation">
      <div class="sidebar-header">
        <div class="flex items-center space-x-3">
          <div class="brand-icon"><i data-feather="layers" class="fluent-icon text-white" aria-hidden="true"></i></div>
          <div>
            <h1 class="text-sm font-semibold brand-title">Griffin PF AI</h1>
            <p class="brand-subtitle">Prototype</p>
          </div>
        </div>
      </div>
      <nav class="sidebar-section">
        <div class="sidebar-section-title">MAIN</div>
        ${nav('dashboard.html','home','Dashboard','dashboard')}
        ${nav('ve-management.html','server','VE Mgmt','ve')}
        ${nav('services-management.html','layers','Services','services')}
      </nav>
      <div class="sidebar-section">
        <div class="sidebar-section-title">QUICK ACCESS</div>
        <div id="protoFavorites" class="px-2">
          <div class="fluent-text-caption1" style="opacity:.6;">No favorites</div>
        </div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-title">ACCOUNT</div>
        <a href="login.html" class="sidebar-nav-item">
          <i data-feather="log-out" class="fluent-icon mr-3" aria-hidden="true"></i>Logout
        </a>
      </div>
    </aside>`;
  }
  function headerTemplate(opts){
    opts = opts || {};
    return `<header class="fluent-header-bar" role="banner" aria-label="Application header">
      <div class="web-container fluent-header-inner">
        <div class="flex justify-between items-center h-app-header">
          <div>
            <h1 class="text-lg font-semibold page-title">${opts.title||''}</h1>
            ${opts.subtitle?`<p class="fluent-text-caption1">${opts.subtitle}</p>`:''}
          </div>
          <div class="user-profile">
            <div class="user-avatar"><i data-feather="${(opts.user&&opts.user.icon)||'user'}" class="fluent-icon user-icon" aria-hidden="true"></i></div>
            <span class="text-sm user-name">${(opts.user&&opts.user.name)||'User'}</span>
          </div>
        </div>
      </div>
    </header>`;
  }
  window.injectSidebar = function(opts){
    var host = document.getElementById('app-sidebar');
    if(!host) return;
    host.innerHTML = sidebarTemplate((opts&&opts.active)||'');
    if(window.refreshFeatherIcons) window.refreshFeatherIcons();
  };
  window.injectHeader = function(opts){
    var host = document.getElementById('app-header');
    if(!host) return;
    host.innerHTML = headerTemplate(opts);
    if(window.refreshFeatherIcons) window.refreshFeatherIcons();
  };
  window.setProtoFavorites = function(list){
    var host = document.getElementById('protoFavorites');
    if(!host) return;
    if(!Array.isArray(list)||!list.length){
      host.innerHTML = '<div class="fluent-text-caption1" style="opacity:.6;">No favorites</div>';
    } else {
      host.innerHTML = list.map(function(f){
        var href = f.type==='service'?'services-management.html':'ve-management.html';
        var icon = f.type==='service'?'package':'server';
        return `<a href="${href}" class="sidebar-nav-item">
          <i data-feather="${icon}" class="fluent-icon mr-3 favorite-icon" aria-hidden="true"></i>${f.name}
        </a>`;
      }).join('');
    }
    if(window.refreshFeatherIcons) window.refreshFeatherIcons();
  };
})();
