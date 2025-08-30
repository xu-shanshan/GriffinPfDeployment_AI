(function () {
  const DEFAULT_USER = { name: 'John Doe', icon: 'user' };

  function buildActions(actions) {
    if (!Array.isArray(actions) || !actions.length) return '';
    return `<div class="flex items-center gap-2">
      ${actions.map((a,i)=>`
        <button type="button"
          class="fluent-button ${a.variant==='primary'?'fluent-button-primary':'fluent-button-subtle'}"
          data-app-header-action="${i}">
          ${a.icon?`<i data-feather="${a.icon}" class="fluent-icon mr-2" aria-hidden="true"></i>`:''}${a.label}
        </button>`).join('')}
    </div>`;
  }

  function renderHeader(mount, opts) {
    if (!mount) return;
    const {
      title = '',
      subtitle = '',
      user = DEFAULT_USER,
      actions = []
    } = opts || {};
    mount.innerHTML = `
      <header class="top-bar" role="banner" aria-label="Application header">
        <div class="web-container">
          <div class="flex justify-between items-center h-app-header">
            <div>
              <h1 class="text-lg font-semibold page-title">${title}</h1>
              ${subtitle?`<p class="fluent-text-caption1">${subtitle}</p>`:''}
            </div>
            <div class="flex items-center gap-3">
              ${buildActions(actions)}
              <div class="user-profile">
                <div class="user-avatar">
                  <i data-feather="${user.icon || 'user'}" class="fluent-icon user-icon" aria-hidden="true"></i>
                </div>
                <span class="text-sm user-name">${user.name || ''}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
    if (window.refreshFeatherIcons) {
      window.refreshFeatherIcons();
    } else if (window.feather) {
      feather.replace();
    }
    // Bind action handlers
    actions.forEach((a,i)=>{
      if (typeof a.onClick === 'function') {
        const btn = mount.querySelector(`[data-app-header-action="${i}"]`);
        if (btn) btn.addEventListener('click', a.onClick);
      }
    });
  }

  window.initHeader = function initHeader(options) {
    function attempt() {
      const el = (options && options.mount) || document.getElementById('app-header');
      if (!el) {
        return false;
      }
      renderHeader(el, options);
      return true;
    }
    if (!attempt()) {
      // Retry after DOM ready if not yet available
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attempt, { once: true });
      } else {
        // small async defer
        setTimeout(attempt, 0);
      }
    }
  };
})();
