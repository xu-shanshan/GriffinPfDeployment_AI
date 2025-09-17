---
mode: edit
---

# Prototype Development TODOs

This document outlines the tasks and structure for building **pure HTML prototype pages**.  
The goal is to quickly validate requirements and interaction design before implementing a full framework (React, Vue, Angular).  
All pages must be **standalone** (openable directly in a browser without build tools) and share a consistent look, feel, and interaction logic.

---

## Root Folder
- [ ] Name root folder `.github/prototype_YYYYMMDDHHMMSS/`.  
  _Ensures each prototype build is timestamped and easily identifiable._

---

## Shared Assets
- [ ] Create `/shared/` folder for common reusable assets.  
  _This avoids duplication and keeps all prototypes consistent._

- [ ] Add `/shared/styles/` with:
  - [ ] `common.css` → Global resets, typography, spacing, colors.
  - [ ] `layout.css` → Shared header, sidebar, and grid layout rules.

- [ ] Add `/shared/js/` with:
  - [ ] `layout.js` → Provides `injectSidebar()` and `injectHeader()` using template strings (works via `file://`).
  - [ ] `mockData.js` → Stores centralized mock data objects.

---

## Layout & Global Guidelines
- [ ] All JS must run in the **global scope** (no ES modules, no async/await).
- [ ] Each page contains placeholder divs:
  ```html
  <div id="app-header"></div>
  <div id="app-sidebar"></div>
````

* [ ] After loading `layout.js`, call:

  ```js
  injectHeader();
  injectSidebar();
  ```
* [ ] CSS class naming:

  * Shared components → `fluent-<functional_name>`
  * Page-specific → `fluent-<page_name>-<functional_name>`

---

## Mock Data

* [ ] Store all mock data in `shared/js/mockData.js`.
  *This simulates backend responses and enables standalone testing.*

* [ ] Example structure:

  ```js
  const mockUsers = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" }
  ];
  ```

* [ ] Each page must import it:

  ```html
  <script src="../shared/js/mockData.js"></script>
  ```

---

## Domain Modeling

* [ ] Analyze business requirements to extract **entities** (e.g., Users, Services, Reports).
* [ ] Identify **relationships** (1\:M, M\:N).
* [ ] Define **pages/screens** needed and their responsibilities.
* [ ] Document roles and permissions (mock security policies for display only).
* [ ] Map roles → page access + action permissions.

---

## HTML Prototype Pages

* [ ] Create `/pages/` folder for all standalone HTML pages.
* [ ] Each page must:

  * [ ] Import shared assets (`common.css`, `layout.js`, `mockData.js`).
  * [ ] Have its own CSS file, named `<page_name>.css`.
  * [ ] Use page-specific CSS classes (`fluent-<page_name>-<functional_name>`).
  * [ ] Be directly openable in a browser without any build tools.

---

## Interaction & Visual Design

* [ ] Ensure **smooth user flows** (tasks should feel natural and frictionless).
* [ ] Maintain **consistent interaction logic** across all pages.
* [ ] Layouts should be **intuitive** and resemble future implementation frameworks (Fluent UI v9).
* [ ] Apply **visual hierarchy** and **accessible design principles**.
* [ ] Design must be **user-friendly**, clear, and lightweight.

---

✅ With this setup, stakeholders can validate requirements, test user flows, and review visual design **before framework development begins**.


