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
- [ ] Added a progress tracking file check.md inside the timestamped prototype root folder.

---

## Shared Assets (Iterative Lifecycle)
> This checklist is re-evaluated every time a new page or feature is added; it is an ongoing loop until the prototype phase ends.  
- [ ] Revisit on each new page/feature: run Reuse Gate search, update candidate list, evaluate promotions.
- [ ] Create `/shared/` folder for common reusable assets.  
  _This avoids duplication and keeps all prototypes consistent._
  - [ ] (Reuse Gate) 在创建新的 shared 资源之前：先全局搜索是否已存在类似内容；若存在，直接复用或最小修改后复用，再视需要抽象。
  - [ ] (Promotion Rule) 仅当同类样式 / 逻辑在 ≥2 个页面出现且语义稳定时，才提升为 shared。
  - [ ] (Incubation) 第一次实现可先放在页面私有 CSS / JS；第二次使用再评估抽象点并迁移。
  - [ ] (Refactor Checklist) 提升到 shared 后：去除页面私有副本、添加注释、更新引用路径。

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
  <div id="app-content"></div>
  ```

- [ ] After loading `layout.js`, call:

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

## Progressive Reuse & Extraction Strategy (增量复用与抽象策略)

Goal: Avoid premature abstraction; minimize churn while still converging on a coherent shared layer.

1. Reuse-First (复用优先)
   - Before authoring new utility / style, search existing shared + page-local assets.
   - Prefer adapting an existing pattern over introducing a near-duplicate.

2. Incubate Locally (本地孵化)
   - First appearance: implement locally (page CSS/JS).
   - Add a lightweight comment marker: `// candidate: shared if reused`.
   - Track candidates in a small list (optional section in check.md).

3. Promotion Criteria (提升条件)
   - Appears in ≥2 pages OR anticipated for ≥3 upcoming pages.
   - API / selector surface is stable (low likelihood of rename).
   - No page-specific semantics embedded (no hard-coded IDs / copy).

4. Extraction Steps (抽象步骤)
   - Identify variable parts → parameterize (naming, selectors, minor options).
   - Move to shared; replace page-local version with import + remove duplication.
   - Update documentation & mapping (fluent-mapping.md if pattern maps to Fluent UI).

5. Versioning / Change Safety
   - When refactoring, keep old selector/class as a temporary alias (deprecated note) if multiple pages still rely on it.
   - Batch removals only after confirming all references updated.

6. Anti-Patterns (避免)
   - Creating a shared helper for a single speculative future use.
   - Embedding business-specific wording (e.g., “Prod only”) inside generic components.
   - Over-parameterizing early (YAGNI).

7. Quick Decision Flow
   ```
   Need feature?
     ↓
   Exists already? → YES: reuse / extend minimal → STOP
     ↓ NO
   Page-local ok? → Implement locally + mark candidate
     ↓ Reused again?
   YES → Extract & document
   ```

中文总结：每一步先问“已有能否直接复用”，不能复用再做最小复制；当出现第二次需求再抽象，避免一开始就拍脑袋设计“通用方案”，降低返工成本。

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


