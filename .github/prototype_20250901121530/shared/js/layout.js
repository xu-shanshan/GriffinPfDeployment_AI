/* layout.js: header + sidebar + favorites + collapse + nav activation */
(function(){
  var ACTIVE_KEY = "SIDEBAR_ACTIVE";
  function injectHeader(){
    if(document.getElementById("fluent-header")) return;
    var h = document.createElement("header");
    h.className="fluent-header";
    h.id="fluent-header";
    h.innerHTML = ''+
      '<div class="fluent-header-title">Griffin Deployment Prototype</div>'+
      '<nav class="fluent-header-actions">'+
        '<a href="dashboard.html">Dashboard</a>'+
        '<a href="ve-management.html">VEs</a>'+
        '<a href="services-management.html">Services</a>'+
        '<a href="deployment-history.html">History</a>'+
        '<a href="login.html" id="logoutLink" style="color:#ff7785">Logout</a>'+
      '</nav>';
    document.body.appendChild(h);
  }

  function injectSidebar(){
    if(document.getElementById("fluent-sidebar")) return;
    var sb = document.createElement("aside");
    sb.className="fluent-sidebar";
    sb.id="fluent-sidebar";
    sb.innerHTML = ''+
      '<button class="fluent-sidebar-toggle" aria-label="Toggle sidebar" title="Toggle sidebar" id="sidebarToggle">⟨</button>'+
      '<div class="fluent-sidebar-section">'+
        '<div class="fluent-sidebar-heading">Navigation</div>'+
        '<ul class="fluent-nav-list" id="navPrimary">'+
          navItem("dashboard","Dashboard","dashboard.html")+
          navItem("ve","VE Mgmt","ve-management.html")+
          navItem("svc","Services","services-management.html")+
          navItem("hist","History","deployment-history.html")+
        '</ul>'+
      '</div>'+
      '<div class="fluent-sidebar-section">'+
        '<div class="fluent-sidebar-heading">Favorites</div>'+
        '<div id="sidebarFavVEs" class="fluent-favorites-mini"></div>'+
        '<div id="sidebarFavSvcs" class="fluent-favorites-mini"></div>'+
      '</div>';
    document.body.appendChild(sb);
    document.body.classList.toggle("sidebar-collapsed", localStorage.getItem("sidebarCollapsed")==="1");
    document.getElementById("sidebarToggle").addEventListener("click", toggleSidebar);
    syncSidebarFavorites();
    applyActiveNav();
  }

  function navItem(key,label,href){
    return '<li class="fluent-nav-item"><a data-nav="'+key+'" href="'+href+'"><span class="label">'+label+'</span></a></li>';
  }

  function toggleSidebar(){
    var collapsed = document.body.classList.toggle("sidebar-collapsed");
    try{ localStorage.setItem("sidebarCollapsed", collapsed ? "1":"0"); }catch(e){}
  }

  function setActiveNav(key){
    try{ localStorage.setItem(ACTIVE_KEY,key);}catch(e){}
    applyActiveNav();
  }

  function applyActiveNav(){
    var key;
    try { key = localStorage.getItem(ACTIVE_KEY); } catch(e){}
    var links = document.querySelectorAll(".fluent-nav-item a");
    for(var i=0;i<links.length;i++){
      var l = links[i];
      if(l.getAttribute("data-nav")===key){
        l.setAttribute("aria-current","page");
      } else {
        l.removeAttribute("aria-current");
      }
    }
  }

  function syncSidebarFavorites(){
    if(!window.MockData) return;
    var fv = document.getElementById("sidebarFavVEs");
    var fs = document.getElementById("sidebarFavSvcs");
    if(!fv||!fs) return;
    fv.innerHTML = "";
    fs.innerHTML = "";
    var limitVE=6, limitSvc=6;
    window.MockData.favorites.ves.slice(0,limitVE).forEach(function(v){
      var a=document.createElement("a");
      a.href="ve-detail.html?ve="+encodeURIComponent(v);
      a.className="fluent-fav-link";
      a.innerHTML='<span class="txt">★ '+v+'</span>';
      fv.appendChild(a);
    });
    window.MockData.favorites.services.slice(0,limitSvc).forEach(function(s){
      var a=document.createElement("a");
      a.href="service-detail.html?service="+encodeURIComponent(s);
      a.className="fluent-fav-link";
      a.innerHTML='<span class="txt">★ '+s+'</span>';
      fs.appendChild(a);
    });
    if(window.MockData.favorites.ves.length===0){
      fv.innerHTML='<div class="fluent-text-dim" style="font-size:12px;">No VE favorites</div>';
    }
    if(window.MockData.favorites.services.length===0){
      fs.innerHTML='<div class="fluent-text-dim" style="font-size:12px;">No Service favorites</div>';
    }
  }

  function toggleFavoriteVE(name){
    window.MockData.toggleFavoriteVE(name);
    syncSidebarFavorites();
  }
  function toggleFavoriteService(name){
    window.MockData.toggleFavoriteService(name);
    syncSidebarFavorites();
  }

  window.injectHeader = injectHeader;
  window.injectSidebar = injectSidebar;
  window.syncSidebarFavorites = syncSidebarFavorites;
  window.setActiveNav = setActiveNav;
  window.toggleFavoriteVE = toggleFavoriteVE;
  window.toggleFavoriteService = toggleFavoriteService;
})();
