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

Checklist (apply per prototype before completion):
[ ] Layout composed with AppLayout (if full page)
[ ] Reusable stat/info cards extracted
[ ] Navigation integration hooks in place (placeholder callbacks)
[ ] All dynamic content exposed via props
[ ] No tailwind or inline colors; only Fluent tokens
[ ] Accessibility attributes applied
[ ] Strict TS types exported

