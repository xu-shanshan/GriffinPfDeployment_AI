

old prototype:  .github\prototype
refactored prototype:  .github\prototype timestamp folder

each page under prototype timestamp folder refer old prototype

1. Create new prototype timestamp folder.
2. Add shared layout (sidebar fragment), shared styles (common + theme), shared JS (utils for fragment include + simple helpers, mockData with domain entities: Users, Roles, VEs, Services, Deployments, Favorites).
3. Domain model: Users (roles: Admin, Operator, Viewer), VirtualEnvironments (type B / B2, environment APE/CPE), Services (Model B / B2, per VE membership), Deployments (history entries), Favorites (user scoped).
4. Dashboard page: render stats (Total VEs, Services, Recent Deployments), favorites (VEs & Services) using mockData; pure HTML + inline script; global scope; no build tools.
5. Page-specific CSS (prefixed fluent-dashboard-*) plus reuse shared styles.
7. No changes to old dashboard.html, only change new dashboard.html under prototype timestamp folder.