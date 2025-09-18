create a new prototype following the established instructions and keeping the existing UI/UX design patterns. 

<!-- Added: prototype_20250901121530 implementation summary -->
## prototype_20250901121530 Summary
- Scaffold: shared/styles (common.css, layout.css), shared/js (layout.js, mockData.js, pageInit.js, auth-mock.js)
- Pages implemented: dashboard, ve-management, services-management, ve-detail, service-detail, service-in-ve, deployment-history, login
- Features: responsive collapsible sidebar (CSS var --sidebar-width), favorites (VEs & Services) with overflow handling, deterministic mock status generation, accessible live regions, keyboard & aria-current nav, accent stat cards, adaptive grids, selection table in ve-detail, deployment history generator, auth mock.
- Class normalization: all new UI uses fluent-* prefix; legacy non‑fluent removed in new pages.
- Visual enhancements: accent gradients, animated (reduced-motion safe) shine, multi-column featured stat, micro trend chips, unified focus ring, grid gaps via --gap-sm/md/lg tokens.

The new prototype will include:
3. Enhanced pages with consistent UI/UX patterns
4. Better accessibility and responsive design
5. Improved navigation and state management
6. Align new timestamp prototype dashboard with legacy prototype UI, I like legacy prototype UI color scheme and data show styles
7. New prototype classes normalized to fluent-* prefix. Non‑fluent legacy class names removed from page markup.

layout.js:
- Unified layout.js (header + sidebar + favorites + active nav)
- Centralized mockData with derived aggregates + events
- Consistent fluent-* classes & responsive grids

dashboard.html:
- Consistent fluent-dashboard-* classes & responsive grids
Favorites UI keep with:
- two dashboard-favorite-card (VEs & Services).
- dashboard-favorite-card
  - dashboard-favorite-card-header
  - dashboard-favorite-card-content
  - dashboard-favorite-card-footer Implement truncation logic (show latest N; older collapsed into an overflow card with “… +X more”).
- Sync sidebar favorites with visible subset (cap total).

sidebar styles:
- Consistent use of fluent-* classes
- Responsive design for different screen sizes
- Improved spacing and alignment for better readability
- Reference to the old prototype design

New prototype scaffold:
- Folder: .github/prototype_20250901121530/
- Added shared assets (tokens, layout, mockData stub, layout.js)
- Created empty dashboard page (header + sidebar only) ready for iterative content build

Added (new prototype only):
- Introduced fluent-* layout aliases: .fluent-container, .fluent-grid-stats, .fluent-grid-favorites, .fluent-grid-auto
- Added gap design tokens (--gap-sm/md/lg) in new prototype common.css
- Dashboard page updated to use .fluent-container alongside legacy .web-container

Implemented dashboard content (prototype_20250901121530):
- Added stats cards (derived counts) with fluent-dashboard-* classes
- Added VE & Service favorite cards (truncation, overflow “… +X more”)
- Added footer summaries per favorite card
- Added sidebar favorites sync (visible subset) via layout.js syncSidebarFavorites()
- Extended common.css (badges + grids)
- Added page-specific dashboard.css styling

you are a Interaction Designer/Visual Designer/UI/UX Designer，

Make the dashboard cards look more engaging and visually dynamic.
Right now, they look too rigid and flat. Add variety in layout, spacing, and visual accents to improve aesthetics and usability.

Dashboard visual upgrade (prototype_20250901121530):
- Added accent system (data-accent / fluent-stat-accent-* classes)
- Featured first stat card spans 2 columns on wide viewports
- Layered gradient + subtle pattern + animated shine (reduced-motion safe)
- Added micro trend chip + secondary label space

Continuation (prototype_20250901121530):
- Sidebar: collapse toggle, aria-current on active item, keyboard accessibility
- Added .fluent-sidebar-toggle + collapsed width behavior
- Added unified focus ring & helper utilities
- Enhanced layout.js (toggle, active nav setter, safe re-sync of favorites)

The sidebar can collapse and expand, but the right content area keeps the same width. It does not resize when the sidebar changes.

Enhancement: Sidebar collapse now dynamically adjusts content width
- Introduced CSS variable --sidebar-width consumed by .fluent-main-shell
- body.sidebar-collapsed overrides variable (64px desktop / 0px mobile)
- Smooth transition added for margin-left

ve-management page (prototype_20250901121530):
- Added pages/ve-management.html + ve-management.css
- Reuses shared layout.js (injectHeader/injectSidebar)
- Implements searchable / filterable VE grid (name / type / scope)
- Uses fluent-ve-* prefixed classes + shared badges
- Simple pagination (12 per page) + a11y live region for results

implement All core pages  for prototype_20250901121530:
- dashboard.html – Stats (auto aggregates), favorites (VEs + Services), animated numbers, accent cards
- ve-management.html – Search (VE + service name), type & scope filters, adaptive grid + responsive pagination, favorites toggle
- services-management.html – Service cards (instances, version, status), search + status filter, favorite sync
- service-detail.html – Dynamic model load from MockData.serviceModels, pipelines grid, favorite sync, modal pipeline view
- ve-detail.html – ?ve= param, dynamic KPIs, services table (selection + prepare states), favorites, live region
- service-in-ve.html – Combined VE/service context view, pipeline snapshot, favorite toggle
- deployment-history.html – Mock row generator from MockData entities, search-ready structure, refresh regeneration
- login.html – Mock auth (auth-mock.js), session persistence, redirect on existing session

Enhancement pass (post-initial implementation):
- ve-detail.html: URL param driven (?ve=), dynamic header KPIs, service table regenerated from MockData.veServicesMap, selectable rows + bulk deploy stubs, live region updates, favorites toggle sidebar sync.
- deployment-history.html: Row generation from MockData entities (services/VEs), search + filter-ready structure, refresh rebuild, live region announcements, empty state handling.
- Shared: pageInit.js utility ensures safe MockData readiness; consistent aria labels & visually hidden live regions added.

Implemented ve-detail.html (prototype_20250901121530):
- Dynamic ?ve= param resolution (fallback SovBase)
- Header KPIs (services count, healthy/attention/deploying tallies) from MockData.veDetails / veServicesMap
- Service table (status, config sources, version, pipeline) with selection + prepare/cancel actions
- Favorites toggle synced to sidebar quick access (add/remove)
- Live region (#veLive) announcements (selection changes, empty states)
- Bulk deploy modal stubs retained for future interaction wiring
- Accessible headings, aria-live usage, checkbox semantics
- Breadcrumb + page title dynamically updated

Sidebar integration:
- Favorites section auto reflects added/removed VE favorites
- Active nav highlighting via SIDEBAR_ACTIVE='ve'
- Safe no-op if MockData not yet ready (initPageWithMockData wrapper handles timing)

Implemented all core pages for prototype_20250901121530 (dashboard, ve-management, services-management, service-detail, ve-detail, service-in-ve, deployment-history, login) with shared layout.js, mockData.js, favorites sync, responsive sidebar collapse and dynamic data flows.