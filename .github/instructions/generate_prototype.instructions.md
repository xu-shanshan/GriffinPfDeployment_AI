---
applyTo: '**'
---

You are acting as a senior full-stack/architecture assistant. 

## Goal
- Quickly generate **pure HTML prototype pages** as a design validation tool before moving to a full framework implementation (e.g., React, Vue, Angular) for requirements validation and interaction design.
- Each page should be **standalone and directly openable in a browser**, no build tools or module system required.
- All mock data is centralized in `shared/js/mockData.js`.
- Layout and styles should reuse shared resources.

## **Constraints & Guidelines:**  
### 1. Domain Modeling
- Analyze business requirements to determine **entities and relationships**.  
- Identify the **pages/screens needed** and their responsibilities.  
- Define roles, permissions, and security policies (for display purposes, can be mocked).
- Map user roles to page access and action permissions.

### 2. Backend Mock & Transition
- Avoid modules, async/await, or centralized API adapters—pages must be standalone.
- Use shared JS objects to simulate data (shared/js/mockData.js). Example:
   ```js
   // shared/js/mockData.js
   const mockUsers = [
   { id: 1, name: "Alice", role: "Admin" },
   { id: 2, name: "Bob", role: "User" }
   ];
   ```
- Pages import mock data via <script> tags. Example:
   ```html
   <script src="shared/js/mockData.js"></script>
   ```

### 3. Frontend Guidelines
- you are a Interaction Designer, Ensure smooth user flows, natural interactions, and frictionless task completion.  
- you are a Visual Designer, Define look & feel, visual hierarchy, and user experience principles.  
- Layout should be intuitive and resemble future implementation frameworks (e.g., Fluent UI v9).  
- Visual design must be user-friendly and accessible.  
- Interaction logic should be **consistent across pages**.  


### 4. Code Output Requirements
### Root Folder
- Name root folder as `.github/prototype_YYYYMMDDHHMMSS/`. 
### Shared Assets
- `/shared/` contains all common assets: 
  - Centralize header + sidebar into a new shared JS file (layout.js)
  - using template strings (no fetch, no duplication, works over file://).
  - Each page keeps only placeholder divs (#app-sidebar, #app-header) and calls injectSidebar / injectHeader after loading layout.js.
  - Styles → `/shared/styles/`  (common.css, theme.css)
  - TypeScript/JS utilities → `/shared/js/`  (mockData.js, layout.js)
- All JS runs in global scope.
- Mock data can be accessed directly in each page.
- CSS class names: `fluent-<functional_name>`.

### HTML Prototype Pages
- Each page is a **standalone HTML file** in `/pages/`.  
- File names should **clearly reflect page functionality**.  
- Each page must have its **own CSS file**, named `<page_name>.css`.  
- Page-specific CSS class names: `fluent-<page_name>-<functional_name>`.  
- Pages import shared assets via <link> or <script> tags.

### Output structure example 
.github/prototype_YYYYMMDDHHMMSS/
├── shared/
│   ├── styles/
│   │   └── common.css
│   │   └── layout.css
│   └── js/
│       ├── layout.js
│       └── mockData.js
└── pages/
  ├── page1.html
  └── page1.css


#### Notes
- All JS code runs in the global scope.
- All mock data can be accessed directly in pages.
- Pages can be directly opened in a browser; no build tools are required.
