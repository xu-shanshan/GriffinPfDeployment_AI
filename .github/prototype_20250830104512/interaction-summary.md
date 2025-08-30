# Interaction Summary

## Pages
1. dashboard.html
2. ve-list.html
3. ve-detail.html
4. service-detail.html
5. deployments.html
6. reports.html
7. settings.html

---

## 1. Dashboard
Functional modules:
- KPI Cards (Total VEs, Services, Deployments Today, Running Deployments)
- Recent Deployments (table)
- At-Risk VEs (health ≠ ok)

User flows:
- Click VE name in tables → ve-detail.html?ve=<VE>
- Click deployment row → deployments.html#<id>
- Press Deploy All button in a VE card (if present) → Modal.open('deployVe')

Data presentation:
- Cards use Components.Card
- Health badges with .badge classes

Navigation:
- Sidebar highlight for Dashboard
- Cross-link to VE Detail & Deployments History

Interactions:
- Deploy button validates GMS.canDeploy()
- Modal confirmation -> publishes 'deploy:start'

---

## 2. VE List (ve-list.html)
Functional modules:
- Filter / Search bar
- VE grid/list toggle (future) (static now)
- VE cards showing counts and quick actions (Deploy All, View)

User flows:
- Enter search text → filters cards by name
- Click Deploy All → Modal.open('deployVe')
- Click View → ve-detail.html?ve=<VE>

Data presentation:
- Cards with health indicator dot + tags (type/environment)

---

## 3. VE Detail (ve-detail.html)
Functional modules:
- VE header (name, type, environment, actions)
- Services table
- Inline filter by service name
- Deploy VE button

User flows:
- Click service name → service-detail.html?ve=<VE>&service=<Service>
- Select services (checkbox) → Deploy Selected button appears
- Deploy flows open deploy modal with scope summary

Data presentation:
- Table columns: Service, BuildType, LatestVersion, Status, Pipelines, Actions
- Status maps to color dot

---

## 4. Service Detail (service-detail.html)
Functional modules:
- Service summary (build type, latest version, VE)
- Build version selector (dropdown or radio)
- Resolved Drop URL pattern preview (replace <BuildVersion>)
- Deploy buttons (Latest / Selected version)

User flows:
- Select version → updates preview
- Deploy Selected → Modal.open('deployService')
- Back to VE link returns to ve-detail.html

Data presentation:
- Card sections: Metadata, Version Selector, Actions

---

## 5. Deployments (deployments.html)
Functional modules:
- Filters: status, VE, text search
- Deployment table (id, VE, Services, Status, Started, Completed, User)
- Status coloring (badge classes)

User flows:
- Click VE → ve-detail
- Click Services cell → open quick modal with full list
- Refresh button (simulated) — re-sorts fake data

Data presentation:
- Table with dynamic filtering using data-* attributes

---

## 6. Reports (reports.html)
Functional modules:
- Aggregation summaries (# succeeded / failed last 24h)
- Trend placeholder chart area (static)
- Top Failing Services list

User flows:
- Click service → service-detail
- Export button (no-op) shows modal "Not implemented"

Data presentation:
- Static placeholders; wiring shows pattern for future dynamic charts

---

## 7. Settings (settings.html)
Functional modules:
- Current user & role summary
- AllowedToSignClaims list (editable future; static now)
- Toggle role (simulated) updates GMS.state.currentUser.roles and UI badges

User flows:
- Click "Switch to Admin" or "Switch to Operator" (simulated)
- Navigate back to a page to see deploy permission changes

Data presentation:
- Simple list + chips

---

## Shared Component Usage References
- Modal.open(id,{ title, body, actions })
- Components.Card({ title, body, right })
- Tooltip via data-tooltip attribute
- Pub/Sub: GMS.sub('deploy:start', handler)

---

## Deployment Confirmation Modal
Trigger:
- Deploy VE → modal summarizes VE + count of services
- Deploy Selected Services → lists selected service names
- Deploy Service (specific version) → shows version & computed Drop URL

Actions:
- Confirm: publishes 'deploy:start' and closes
- Cancel: closes

---

## Permission Logic
Predicate: GMS.canDeploy()
If false:
- All deploy buttons disabled with data-tooltip="No deploy permission"
If true:
- Enabled; clicking opens modal

---

## Non-Functional
- No network IO (static) → UPDATED: single fetch to ReleaseMapping.json for canonical mock data, fallback to inline stub if fetch fails
- Data from GMS.data.*
- Styling minimal; focus on layout & interaction patterns

## Dynamic Data Loading (NEW)
- shared/mock-data.js fetches ../instructions/ReleaseMapping.json (groups, VE → services, per-service build metadata)
- Transforms into:
  - G.data.VEs (flattened list; type inferred: names containing B2 => type B2/CPE else B/APE)
  - G.data.Services (per VE → array of service objects with pipelines list)
  - G.data.BuildDetails (pattern + ring root; versions placeholder)
- Publishes event data:replace when enrichment completes
- Pages may subscribe (e.g., ve-list.html) to re-render without full reload
- Fallback path keeps original inline stub to avoid blank initial render

