(function () {
    const ACTIVE_KEY = (window.SIDEBAR_ACTIVE || '').toLowerCase();
    const FAVORITES = Array.isArray(window.SIDEBAR_FAVORITES) ? window.SIDEBAR_FAVORITES : [
        { name: 'SovBase', query: 'SovBase' },
        { name: 'ModelBSov', query: 'ModelBSov' },
        { name: 'OwaMailB2-SOV', query: 'OwaMailB2-SOV' }
    ];

    function navItem(href, icon, label, key) {
        const isActive = ACTIVE_KEY === key;
        return `<a href="${href}" class="sidebar-nav-item${isActive ? ' active' : ''}"${isActive ? ' aria-current="page"' : ''}>
            <i data-feather="${icon}" class="fluent-icon mr-3" aria-hidden="true"></i>${label}
        </a>`;
    }

    function favoriteLinks(list) {
        return list.map(v => `
            <a href="ve-detail.html?ve=${encodeURIComponent(v.query)}" class="sidebar-nav-item">
                <i data-feather="star" class="fluent-icon mr-3 favorite-icon" aria-hidden="true"></i>${v.name}
            </a>`).join('');
    }

    function buildSidebar() {
        return `<aside class="sidebar" role="navigation" aria-label="Main navigation">
            <div class="sidebar-header">
                <div class="flex items-center space-x-3">
                    <div class="brand-icon">
                        <i data-feather="layers" class="fluent-icon text-white" aria-hidden="true"></i>
                    </div>
                    <div class="brand-text">
                        <h1 class="text-sm font-semibold brand-title">Griffin PF AI</h1>
                        <p class="brand-subtitle">Deployment Platform</p>
                    </div>
                </div>
            </div>
            <nav class="sidebar-section">
                <div class="sidebar-section-title">Main Navigation</div>
                ${navItem('dashboard.html','home','Dashboard','dashboard')}
                ${navItem('ve-management.html','server','VE Management','ve')}
                ${navItem('services-management.html','layers','Services Management','services')}
                ${navItem('deployment-history.html','clock','History','history')}
            </nav>
            <div class="sidebar-section" id="sidebarFavoritesSection">
                <div class="sidebar-section-title">Quick Access</div>
                <div id="sidebarFavoritesList">
                    ${favoriteLinks(FAVORITES)}
                </div>
            </div>
            <div class="sidebar-section">
                <div class="sidebar-section-title">Account</div>
                <a href="login.html" class="sidebar-nav-item">
                    <i data-feather="log-out" class="fluent-icon mr-3" aria-hidden="true"></i>Logout
                </a>
            </div>
        </aside>`;
    }

    function applyIconEnhancements(root = document) {
        // fill favorite stars
        root.querySelectorAll('svg.feather-star').forEach(svg => {
            svg.classList.add('favorite-fill');
        });
    }

    function refreshFeatherIcons() {
        if (window.feather) {
            feather.replace();
            applyIconEnhancements();
        }
    }

    window.refreshFeatherIcons = refreshFeatherIcons;

    function mount() {
        const host = document.getElementById('app-sidebar');
        if (!host) return;
        host.innerHTML = buildSidebar();
        refreshFeatherIcons();
    }

    window.refreshSidebarFavorites = function (newList) {
        const listEl = document.getElementById('sidebarFavoritesList');
        if (!listEl || !Array.isArray(newList)) return;
        listEl.innerHTML = favoriteLinks(newList);
        refreshFeatherIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
