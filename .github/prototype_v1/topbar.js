(function (global) {
  function buildTopBar(opts) {
    const {
      brand = 'Griffin SovOps Manager',
      subtitle = 'Virtual Environment Management',
      user = 'John Operator',
      role = 'Operator'
    } = opts || {};

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
      <h1 class="text-base font-semibold" style="color:var(--colorNeutralForeground1);">${brand}</h1>
      <p class="fluent-caption1">${subtitle}</p>
    </div>
  </div>
  <div class="ml-auto flex items-center gap-4" style="padding:0 1.25rem;">
    <div class="hidden md:flex flex-col items-end">
      <span class="fluent-body1 font-medium" style="color:var(--colorNeutralForeground1);">${user}</span>
      <span class="fluent-caption1">${role}</span>
    </div>
    <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background:var(--colorNeutralBackground3);">
      <i data-feather="user" class="fluent-icon" style="color:var(--colorNeutralForeground3);"></i>
    </div>
    <a href="login.html" class="fluent-button fluent-button-subtle" title="Sign out">
      <i data-feather="log-out" class="fluent-icon"></i>
    </a>
  </div>
</header>`;
  }

  function renderTopBar(options) {
    if (document.querySelector('header.top-bar')) return; // already present
    document.body.insertAdjacentHTML('afterbegin', buildTopBar(options || {}));
    if (global.feather) global.feather.replace();
  }

  function autoInit() {
    const script = document.currentScript;
    if (!script) return;
    const opts = {
      brand: script.dataset.brand,
      subtitle: script.dataset.subtitle,
      user: script.dataset.user,
      role: script.dataset.role
    };
    renderTopBar(opts);
  }

  global.renderTopBar = renderTopBar;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})(window);
