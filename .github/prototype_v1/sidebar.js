(function(global){
  function buildHeader(){
    return `
<header class="top-bar">
  <div class="brand-block">
    <div class="brand-left">
      <div id="siderToggle" role="button" tabindex="0" aria-label="Toggle navigation" aria-expanded="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </div>
    </div>
    <div class="topbar-divider"></div>
    <div style="padding-left:1rem;">
      <h1 class="text-base font-semibold" style="color:var(--colorNeutralForeground1);">Griffin SovOps Manager</h1>
      <p class="fluent-caption1">Virtual Environment Management</p>
    </div>
  </div>
  <div class="ml-auto flex items-center gap-4" style="padding:0 1.25rem;">
    <div class="hidden md:flex flex-col items-end">
      <span class="fluent-body1 font-medium" style="color:var(--colorNeutralForeground1);">John Operator</span>
      <span class="fluent-caption1">Operator</span>
    </div>
    <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background:var(--colorNeutralBackground3);">
      <i data-feather="user" class="fluent-icon" style="color:var(--colorNeutralForeground3);"></i>
    </div>
    <a href="login.html" class="fluent-button fluent-button-subtle">
      <i data-feather="log-out" class="fluent-icon"></i>
    </a>
  </div>
</header>`;
  }

  function buildSidebar(){
    return `
<aside class="fluent-sider" aria-label="Primary navigation">
  <nav class="fluent-nav fluent-nav-vertical">
    <div class="fluent-nav-section">
      <div class="fluent-nav-section-title">Overview</div>
      <a class="fluent-nav-item" data-key="dashboard" href="dashboard.html">
        <i data-feather="home" class="fluent-icon"></i><span class="nav-label">Dashboard</span>
      </a>
      <a class="fluent-nav-item" data-key="history" href="deployment-history.html">
        <i data-feather="clock" class="fluent-icon"></i><span class="nav-label">History</span>
      </a>
    </div>
    <div class="fluent-nav-section">
      <div class="fluent-nav-section-title">Management</div>
      <a class="fluent-nav-item" data-key="ve-management" href="ve-management.html">
        <i data-feather="server" class="fluent-icon"></i><span class="nav-label">VE Management</span>
      </a>
      <a class="fluent-nav-item" data-key="services" href="services.html">
        <i data-feather="layers" class="fluent-icon"></i><span class="nav-label">Services</span>
      </a>
      <a class="fluent-nav-item" data-key="permissions" href="permissions.html">
        <i data-feather="shield" class="fluent-icon"></i><span class="nav-label">Permissions</span>
      </a>
    </div>
    <div class="fluent-nav-section">
      <div class="fluent-nav-section-title">Operations</div>
      <a class="fluent-nav-item" data-key="deploy" href="deploy.html">
        <i data-feather="upload-cloud" class="fluent-icon"></i><span class="nav-label">Deploy</span>
      </a>
      <a class="fluent-nav-item" data-key="artifacts" href="artifacts.html">
        <i data-feather="package" class="fluent-icon"></i><span class="nav-label">Artifacts</span>
      </a>
    </div>
    <div class="fluent-nav-section">
      <div class="fluent-nav-section-title">System</div>
      <a class="fluent-nav-item" data-key="settings" href="settings.html">
        <i data-feather="settings" class="fluent-icon"></i><span class="nav-label">Settings</span>
      </a>
    </div>
  </nav>
</aside>`;
  }

  function renderSidebar(containerEl, activeKey){
    if(!containerEl) return;
    containerEl.insertAdjacentHTML('afterbegin', buildSidebar());
    if(activeKey){
      const active = containerEl.querySelector(`.fluent-nav-item[data-key="${activeKey}"]`);
      if(active) active.setAttribute('aria-current','page');
    }
    if(global.feather) global.feather.replace();
  }

  function attachToggle(){
    const body=document.body;
    const toggle=document.getElementById('siderToggle');
    const overlay=document.getElementById('siderOverlay');
    const aside=document.querySelector('aside.fluent-sider');
    if(!toggle || !aside) return;

    const navItems=()=>Array.from(aside.querySelectorAll('.fluent-nav-item'));

    function applyCollapsed(collapsed){
      toggle.setAttribute('aria-expanded', String(!collapsed));
      navItems().forEach(a=>{
        const lbl=a.querySelector('.nav-label');
        if(!lbl) return;
        if(collapsed){
          a.setAttribute('title', lbl.textContent.trim());
          lbl.setAttribute('aria-hidden','true');
        } else {
          a.removeAttribute('title');
          lbl.removeAttribute('aria-hidden');
        }
      });
    }
    function openMobile(){ body.classList.add('sider-open'); overlay?.setAttribute('aria-hidden','false'); }
    function closeMobile(){ body.classList.remove('sider-open'); overlay?.setAttribute('aria-hidden','true'); }
    function doToggle(){
      const mobile = window.matchMedia('(max-width:930px)').matches;
      if(mobile){
        body.classList.contains('sider-open') ? closeMobile() : openMobile();
        return;
      }
      body.classList.toggle('sider-collapsed');
      applyCollapsed(body.classList.contains('sider-collapsed'));
    }
    toggle.addEventListener('click', doToggle);
    toggle.addEventListener('keydown', e=>{
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); doToggle(); }
    });
    overlay?.addEventListener('click', closeMobile);
    navItems().forEach(a=> a.addEventListener('click', closeMobile));
    applyCollapsed(body.classList.contains('sider-collapsed'));

    let lastMobile=window.matchMedia('(max-width:930px)').matches;
    window.addEventListener('resize', ()=>{
      const now=window.matchMedia('(max-width:930px)').matches;
      if(now!==lastMobile){
        body.classList.remove('sider-open');
        overlay?.setAttribute('aria-hidden','true');
        applyCollapsed(body.classList.contains('sider-collapsed'));
        lastMobile=now;
      }
    });
  }

  function renderLayout(opts={}){
    const { active, mainSelector='main', autoWrap=true } = opts;
    let main = document.querySelector(mainSelector);
    if(!main){
      console.warn('[layout] main element not found');
      return;
    }
    main.classList.add('app-main');

    // Create app-shell wrapper if not present
    if(autoWrap && !main.parentElement.classList.contains('app-shell')){
      const shell=document.createElement('div');
      shell.className='app-shell';
      main.parentNode.insertBefore(shell, main);
      shell.appendChild(main);
    }
    // Inject overlay if absent
    if(!document.getElementById('siderOverlay')){
      const ov=document.createElement('div');
      ov.id='siderOverlay';
      ov.className='sider-overlay';
      ov.setAttribute('aria-hidden','true');
      document.body.insertBefore(ov, document.body.firstChild.nextSibling);
    }
    // Inject header if missing
    if(!document.querySelector('header.top-bar')){
      document.body.insertAdjacentHTML('afterbegin', buildHeader());
    }
    // Insert sidebar
    const shell=document.querySelector('.app-shell');
    renderSidebar(shell, active);
    attachToggle();
    if(global.feather) global.feather.replace();
  }

  // Auto mode
  function autoInit(){
    const script=document.currentScript;
    if(!script) return;
    if(script.dataset.auto === 'true'){
      const key=script.dataset.activeNav || '';
      renderLayout({ active:key });
    }
  }

  global.renderSidebar = renderSidebar;
  global.renderLayout = renderLayout;

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})(window);
