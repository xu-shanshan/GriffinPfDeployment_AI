function injectHeader(){
  var h = document.getElementById("app-header");
  if(!h) return;
  h.className="fluent-header";
  h.innerHTML = '' +
    '<div class="fluent-header-left">Griffin Deployment Portal (Prototype)</div>' +
    '<div class="fluent-header-right">' +
      '<span id="current-user-chip" class="fluent-user-chip"></span>' +
      '<a class="fluent-link" href="../pages/login.html">Switch User</a>' +
    '</div>';
  setTimeout(function(){
    var chip = document.getElementById("current-user-chip");
    if(chip && window.currentUser){
      chip.textContent = currentUser.name + " ("+ currentUser.role +")";
    }
  },0);
}

function injectSidebar(active){
  var s = document.getElementById("app-sidebar");
  if(!s) return;
  var items = [
    { href:"dashboard.html", label:"VEs" },
    { href:"deployments-history.html", label:"Deployments" },
    { href:"permissions.html", label:"Permissions" }
  ];
  s.className="fluent-sidebar";
  var html = '<div class="fluent-sidebar-title">Navigation</div><ul class="fluent-nav">';
  for(var i=0;i<items.length;i++){
    var it = items[i];
    var cls = (active===it.href) ? "fluent-nav-item active" : "fluent-nav-item";
    html += '<li class="'+cls+'"><a href="'+it.href+'">'+it.label+'</a></li>';
  }
  html+='</ul>';
  s.innerHTML = html;
}

function parseQuery(){
  var q = {};
  var parts = window.location.search.substring(1).split("&");
  for(var i=0;i<parts.length;i++){
    if(!parts[i]) continue;
    var kv = parts[i].split("=");
    q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]||"");
  }
  return q;
}

function renderTag(text, cls){
  return '<span class="fluent-tag '+ (cls||'') +'">'+ text +'</span>';
}
