(function () {
    const ACTIVE_KEY = (window.SIDEBAR_ACTIVE || '').toLowerCase();
    const LS_KEY = 'griffin.sidebar.favorites.v2'; // new key (v2) for type support; old migrated

    function loadStoredFavorites() {
        try {
            // prefer v2
            let raw = localStorage.getItem(LS_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return normalizeFavorites(parsed);
            }
            // migrate legacy (no type)
            raw = localStorage.getItem('griffin.sidebar.favorites');
            if (raw) {
                const legacy = JSON.parse(raw);
                if (Array.isArray(legacy)) return normalizeFavorites(legacy);
            }
        } catch (e) { /* ignore */ }
        return null;
    }
    function normalizeFavorites(list) {
        return list
            .filter(x => x && x.name)
            .map(x => ({
                name: x.name,
                query: x.query || x.name,
                type: x.type === 'service' ? 'service' : 've'
            }));
    }

    const initialStored = loadStoredFavorites();
    const rawInit = initialStored ||
        (Array.isArray(window.SIDEBAR_FAVORITES) ? window.SIDEBAR_FAVORITES : [
            { name: 'SovBase', query: 'SovBase', type: 've' },
            { name: 'ModelBSov', query: 'ModelBSov', type: 've' },
            { name: 'OwaMailB2-SOV', query: 'OwaMailB2-SOV', type: 've' }
        ]);
    const FAVORITES = normalizeFavorites(rawInit);
    function persistFavorites(list) {
        try { localStorage.setItem(LS_KEY, JSON.stringify(normalizeFavorites(list))); } catch(e) { /* ignore */ }
    }

    function navItem(href, icon, label, key) {
        const isActive = ACTIVE_KEY === key;
        return `<a href="${href}" class="sidebar-nav-item${isActive ? ' active' : ''}"${isActive ? ' aria-current="page"' : ''}>
            <i data-feather="${icon}" class="fluent-icon mr-3" aria-hidden="true"></i>${label}
        </a>`;
    }

    function favoriteLinks(list) {
        if (!list.length) return '<div class="px-4 fluent-text-caption1" style="opacity:.6;">No favorites</div>';
        const groups = {
            ve: list.filter(f => f.type === 've'),
            service: list.filter(f => f.type === 'service')
        };
        function groupBlock(title, items, typeKey){
            if(!items.length) return '';
            const links = items.map(v => {
                const href = v.type === 'service'
                    ? `service-detail.html?service=${encodeURIComponent(v.query)}`
                    : `ve-detail.html?ve=${encodeURIComponent(v.query)}`;
                const icon = v.type === 'service' ? 'package' : 'server';
                return `<a href="${href}" class="sidebar-nav-item" data-fav-type="${v.type}" aria-label="${v.name} ${v.type} quick link">
                    <i data-feather="${icon}" class="fluent-icon mr-3 favorite-icon" aria-hidden="true"></i>${v.name}
                </a>`;
            }).join('');
            return `<div class="quick-access-group" aria-label="${title}">
                <div class="quick-access-group-title">${title}</div>
                ${links}
            </div>`;
        }
        return groupBlock('Virtual Environments', groups.ve, 've') + groupBlock('Services', groups.service, 'service');
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
                <div class="sidebar-section-title">MAIN NAVIGATION</div>
                ${navItem('dashboard.html','home','Dashboard','dashboard')}
                ${navItem('ve-management.html','server','VE Management','ve')}
                ${navItem('services-management.html','layers','Services Management','services')}
                ${navItem('deployment-history.html','clock','History','history')}
            </nav>
            <div class="sidebar-section" id="sidebarFavoritesSection">
                <div class="sidebar-section-title">QUICK ACCESS</div>
                <div id="sidebarFavoritesList">
                    ${favoriteLinks(FAVORITES)}
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
        const norm = normalizeFavorites(newList);
        listEl.innerHTML = favoriteLinks(norm);
        refreshFeatherIcons();
        persistFavorites(norm);
    };

    // Public helper APIs for pages
    window.getSidebarFavorites = () => {
        const listEl = document.getElementById('sidebarFavoritesList');
        if (!listEl) return FAVORITES.slice();
        return Array.from(listEl.querySelectorAll('a.sidebar-nav-item')).map(a => {
            const name = a.textContent.trim();
            const type = a.getAttribute('data-fav-type') === 'service' ? 'service' : 've';
            return { name, query: name, type };
        });
    };

    window.setSidebarFavorites = (list) => {
        if (!Array.isArray(list)) return;
        window.refreshSidebarFavorites(list);
    };
    window.addToSidebarFavorites = (item) => {
        if (!item || !item.name) return;
        const type = item.type === 'service' ? 'service' : 've';
        const list = window.getSidebarFavorites();
        if (!list.some(f => f.name === item.name && f.type === type)) {
            list.push({ name: item.name, query: item.query || item.name, type });
            window.refreshSidebarFavorites(list);
        }
    };
    window.removeFromSidebarFavorites = (name, typeHint) => {
        if (!name) return;
        const list = window.getSidebarFavorites()
            .filter(f => !(f.name === name && (!typeHint || f.type === (typeHint === 'service' ? 'service' : 've'))));
        window.refreshSidebarFavorites(list);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
