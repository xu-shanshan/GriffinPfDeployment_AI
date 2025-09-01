---
mode: edit
---

Project Context:
- React 19 + TypeScript + Fluent UI v9
- Functional components (React.FC), strict TypeScript
- Zustand for global state, React Query for server state
- Fluent UI makeStyles for styling, responsive design, accessibility required
- Components must follow .copilot.yml Instructions

Task:
- Generate reusable React layout components from HTML prototypes in: C:\src\gitXxtq\GriffinPfDeployment_AI\.github\prototypes

Supported Component Types:
- Sidebar (AppSidebar) : navigation + favorites
- Header (AppHeader) : title, subtitle, user menu
- Layout (AppLayout) : composes Sidebar + Header + content
- Page (e.g., DashboardPage): transforms full HTML prototype into composed React components using existing layout primitives

Guidelines:
- Preserve semantic intent, replace raw HTML with Fluent UI components
- Provide typed props for dynamic data: nav items, favorites, user, titles
- Accessibility: proper roles (banner, navigation, main), aria-current for active route
- Responsive: collapsible sidebar for narrow viewports
- No hard-coded colors; use Fluent UI tokens
- Avoid 'any'; ensure discriminated unions or interfaces
- Output each component as a .tsx file with default export and minimal inline prop docs
- Keep code concise; prefer composition over duplication
- For Page components: split repeated UI into smaller reusable components (cards, sections) under components/<page>/; keep page file focused on data wiring & composition
- Provide light value animation for numeric KPIs (requestAnimationFrame) when feasible

Workflow (ALL prototypes in /prototypes):
1. Enumerate every *.html file under .github/prototypes (excluding shared assets directories).
2. For each file:
   a. Derive base name (e.g., dashboard.html -> DashboardPage, ve-management.html -> VeManagementPage).
   b. Identify repeating UI fragments; extract as reusable components under src/frontend/components/<segment>/.
   c. Use existing AppLayout (Sidebar + Header) unless the prototype is an isolated widget (then create a pure component).
   d. Replace prototype icons with Fluent UI v9 icons matching semantics.
   e. Convert utility CSS classes into makeStyles tokens-based styles (NO tailwind classes in output).
   f. Provide typed props for all dynamic text, collections, counts, and action handlers.
   g. Add accessibility: roles, aria-labels, aria-current, keyboard activation for interactive cards.
3. Page File Responsibilities:
   - Data wiring (temporary mock hooks) + composition of extracted components.
   - No inline fetch logic; when integrating React Query, migrate mocks to hooks/queries.
4. Component Naming Conventions:
   - <Base>Page for full page prototypes.
   - <Domain><Element> (e.g., VeListTable, ServiceDetailHeader) for extracted parts.
   - Shared generic pieces go to components/common/.
5. Prop Patterns:
   - Collections: readonly arrays with explicit interface exports.
   - Callbacks: on<Action> signature returning void or Promise<void>.
6. Animation:
   - KPI numeric rise uses requestAnimationFrame; guard with prefers-reduced-motion media query if needed later.
7. Regeneration Rule:
   - If prototype HTML updates, regenerate only impacted components/pages; avoid touching unrelated files.
8. Output Format:
   - One .tsx file per component/page, default export, strict TypeScript (no any).
9. Exclusions:
   - Do not copy raw <script> blocks; translate logic into React hooks.
   - Do not embed global window mutations.

Generation Phases (execute strictly in order):

Phase 0: Bootstrap Running Project (must succeed before any component/page generation)
- Create minimal runnable React 19 + Vite + TypeScript scaffold
  * Files: package.json, tsconfig.json, vite.config.ts, index.html, src/frontend/main.tsx (or main entry), src/frontend/App.tsx, theme/fluentTheme.ts, AppRouter.tsx
  * Include FluentProvider + QueryClientProvider + BrowserRouter + ErrorBoundary
  * Add placeholder routes (e.g., /health) returning a simple div so dev server proves working
  * Add a README bootstrap snippet (optional) or inline comment in prompt describing start commands
  * Ensure npm install --legacy-peer-deps && npm run dev launches without runtime errors or missing deps
- Success Criteria: Visiting / shows redirect or baseline page without console errors
- Directory Exclusions (apply to all phases): node_modules, dist, build, coverage, .turbo, .vite, .cache (never traverse or generate inside)

Phase 1: Core Layout Components
- Implement AppSidebar, AppHeader, AppLayout with strict typed props (already defined patterns)
- Provide responsive collapse + aria attributes
- No business logic; only structural + styling via makeStyles

Phase 2: Page Transformations (per Prototype → Page Mapping)
- For each prototype HTML, generate its Page component using existing layout primitives
- Extract reusable subcomponents (cards, tables, filters) into domain folders (dashboard/, ve/, service/, history/)
- Replace prototype scripts with React state + hooks (mock data only)

Phase 3: Data Abstraction & Mocks
- Centralize mock domain data (e.g., mock-data.json or typed module) and lightweight hooks (useDashboardData, useVeList, etc.)
- Prepare hook signatures for later React Query integration (return shape: { data, isLoading, error })

Phase 4: Interaction & Accessibility Hardening
- Keyboard support for cards (Enter/Space)
- aria-live for notifications (if added later)
- Reduced-motion guard for animations (prefers-reduced-motion)

Phase 5: Progressive Enhancement
- Introduce Zustand slices (auth, layout state) placeholders
- Introduce query keys & skeleton placeholders (no real fetch yet)
- Add error boundaries per route (optional)

Failure Handling:
- If Phase 0 not complete, do NOT proceed to later phases.
- Regenerate only failing phase artifacts; earlier successful phases remain untouched.

Scaffold Checklist (Phase 0):
[ ] package.json with react, react-dom, @fluentui/react-components, @tanstack/react-query, react-router-dom, vite, @vitejs/plugin-react
[ ] tsconfig.json strict settings
[ ] vite.config.ts with @vitejs/plugin-react
[ ] index.html with #root and module script to main.tsx
[ ] main.tsx mounts <App />
[ ] App.tsx wraps providers & ErrorBoundary (no nested BrowserRouter duplication later)
[ ] AppRouter.tsx includes at least /dashboard placeholder route early
[ ] Dev server runs: npm install --legacy-peer-deps && npm run dev (documented)
[ ] Console free of missing module errors

Upgrade Path Notes:
- Replace mock arrays with React Query queries (Phase 3→ later) without altering component props.
- Convert direct navigation placeholders to use useNavigate from react-router.
- Introduce role-based guard HOC or component wrapper when auth available.

Modification Ordering Rule:
- Always update / add scaffolding before referencing new components.
- When adding a component referenced by multiple pages, generate the component file first, then adjust pages.

Regeneration Triggers:
- Prototype structural HTML change → regenerate only affected page + related extracted components
- Design token / theme change → update theme/fluentTheme.ts only
- Navigation schema change → update AppSidebar props mapping + AppRouter

Post-Generation Run Steps:
1. Ensure pages registered in AppRouter.tsx
2. Install deps: npm install --legacy-peer-deps   (DO NOT append other words on same line)
   - To start dev server: npm run dev
   - Correct chaining example: npm install --legacy-peer-deps && npm run dev
   - If you accidentally ran "npm install --legacy-peer-deps npm run dev", delete node_modules and package-lock.json then reinstall.
3. Verify each route renders without console errors
4. Replace mock hooks with React Query integrations incrementally

Prototype → Page Mapping:
- dashboard.html -> /dashboard -> DashboardPage
- ve-management.html -> /ves -> VeManagementPage
- ve-detail.html -> /ve/:name -> VeDetailPage
- service-in-ve.html -> /ve/:ve/service/:service -> VeServiceInVePage
- services-management.html -> /services -> ServicesManagementPage
- service-detail.html -> /service/:id -> ServiceDetailPage
- deployment-history.html -> /deployments -> DeploymentHistoryPage
- login.html -> /login -> LoginPage
- NOTE: Replaced ve-service-overview.html with service-in-ve.html for clarity.

Phase 0 Implementation Plan (Pending – requires permission to add new files):
1. Files to create (root-relative):
   - /src/frontend/package.json (scripts: dev, build, lint; deps: react@19, react-dom, @fluentui/react-components, @tanstack/react-query, react-router-dom, zustand, zod, react-hook-form)
   - /src/frontend/tsconfig.json (strict true, jsx: react-jsx, moduleResolution: node16/bundler)
   - /src/frontend/vite.config.ts (ESM, @vitejs/plugin-react)
   - /src/frontend/index.html (#root mount)
   - /src/frontend/src/main.tsx (mount providers)
   - /src/frontend/src/App.tsx (ErrorBoundary + AppRouter)
   - /src/frontend/src/AppRouter.tsx (BrowserRouter + routes: /login, /dashboard, /ves, /ve/:name, /ve/:ve/service/:service, /services, /service/:id, /deployments; temporary placeholders)
   - /src/frontend/src/theme/fluentTheme.ts (FluentProvider custom theme)
   - /src/frontend/src/components/layout/AppSidebar.tsx
   - /src/frontend/src/components/layout/AppHeader.tsx
   - /src/frontend/src/components/layout/AppLayout.tsx
   - /src/frontend/src/store/layout.ts (Zustand slice placeholder: sidebarCollapsed)
   - /src/frontend/src/store/auth.ts (auth role placeholder)
   - /src/frontend/src/hooks/usePrefersReducedMotion.ts
   - /src/frontend/src/hooks/queries/ (empty index placeholder for Phase 3)
   - /src/frontend/src/types/navigation.ts (Nav item + favorite types)
2. Initial Routes return simple <div> placeholders; no prototype logic yet (ensures dev server runs clean).
3. After scaffold confirms (npm install --legacy-peer-deps && npm run dev) proceed to Phase 1 layout components (Sidebar/Header/Layout) then Phase 2 page transformations.
4. No business logic; only structural + accessibility (roles: navigation, banner, main; aria-current for active link).

Prototype Enumeration (for Phase 2 mapping confirmation):
- dashboard.html -> DashboardPage (/dashboard)
- ve-management.html -> VeManagementPage (/ves)
- ve-detail.html -> VeDetailPage (/ve/:name)
- service-in-ve.html -> VeServiceInVePage (/ve/:ve/service/:service)
- services-management.html -> ServicesManagementPage (/services)
- service-detail.html -> ServiceDetailPage (/service/:id)
- deployment-history.html -> DeploymentHistoryPage (/deployments)
- login.html -> LoginPage (/login)

Awaiting Instruction:
Please confirm: "Proceed with Phase 0 scaffold" so new files can be generated. Once confirmed, I will output each new file in separate code blocks per project conventions.

Regeneration / Safety:
- Will not modify existing prototype HTML files until scaffold + core layout components exist.
- Subsequent responses will keep changes minimal and grouped per file as required.

NOTE: Renamed ve-service-detail.html to ve-service-overview.html for clarity.
Update any remaining references during Phase 2 component generation.

