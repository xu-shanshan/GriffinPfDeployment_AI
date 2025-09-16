# HTML Prototype → Fluent UI v9 Mapping

| HTML Prototype (recommended `fluent-*` class) | Future Fluent UI v9 Component         | Common Props / Notes                                                                     |
| --------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `<button class="fluent-button">`              | `<Button>`                            | `appearance` (`primary`, `subtle`, `outline`), `icon`, `size`                            |
| `<span class="fluent-badge">`                 | `<Badge>`                             | `appearance` (`filled`, `ghost`, `outline`), `color` (`success`, `warning`, `important`) |
| `<section class="fluent-card">`               | `<Card>`                              | Works with `<CardHeader>` `<CardFooter>`, `orientation`, `appearance`                    |
| `<input class="fluent-input">`                | `<Input>`                             | `appearance` (`outline`, `underline`, `filled-darker`), `size`                           |
| `<label class="fluent-label">`                | `<Label>`                             | `size` (`small`, `medium`, `large`)                                                      |
| `<textarea class="fluent-textarea">`          | `<Textarea>`                          | `resize` (`none`, `both`)                                                                |
| `<select class="fluent-select">`              | `<Dropdown>`                          | `appearance`, `multiselect`                                                              |
| `<div class="fluent-toolbar">`                | `<Toolbar>`                           | Use with `ToolbarButton`, `ToolbarDivider`                                               |
| `<nav class="fluent-nav">` (horizontal)       | `<Nav>` / `<Toolbar>`         | Use `aria-current="page"` |
| `<aside class="fluent-sider">` + `<nav class="fluent-nav fluent-nav-vertical">` | `<Nav orientation="vertical">` | Group sections, icons, collapsible |
| `<table class="fluent-table">`                | `<Table>`                             | Header / Row / Cell components |
| `<div class="fluent-avatar">AB</div>`         | `<Avatar>`                            | `name`, `size` |
| `<div class="fluent-dialog">...</div>`        | `<Dialog>`                            | Surface / Body / Actions |
| `<div class="fluent-toast">...</div>`         | `<Toast>`                             | Use `ToastProvider` |
| `<div class="fluent-tooltip">`                | `<Tooltip>`                           | `relationship="description"` |
| `<progress class="fluent-progress">`          | `<ProgressBar>` / `<ProgressRing>`    | Linear or circular                                                                       |
| `<header class="fluent-header">`              | `<Toolbar>` / `<CardHeader>`          | App bars |
| `<footer class="fluent-footer">`              | `<CardFooter>`                        | Actions / summary                                                                    |
| `<h1 class="fluent-title">`                   | `<Title1>` – `<Title3>`               | Typography API                                                              |
| `<p class="fluent-body">`                     | `<Body1>` – `<Body2>`                 | Body text                                                                            |

## Layout Prototype Pattern
Top + Sider + Right Content:
```html
<header class="top-bar">...</header>
<div class="app-shell">
  <aside class="fluent-sider">
    <nav class="fluent-nav fluent-nav-vertical">
      <a class="fluent-nav-item" aria-current="page">...</a>
      <!-- section groups -->
    </nav>
  </aside>
  <main>...</main>
</div>
```
Migration:
- fluent-sider + vertical nav → Wrap with custom AppLayout component; use `<Nav appearance="subtle" selectedValue=... orientation="vertical" />`
- Collapse state → local React state + CSS variable controlling width.
- Mobile drawer → conditionally render overlay + animate translate.

Accessibility:
- `aria-label` on nav / aside.
- Use `aria-current="page"` on active route.
- Keep logical section grouping headings (visually small) for screen reader navigability.

## How to Use (Prototype)
```html
<section class="fluent-card">
  <h2 class="fluent-title">Active Deployments</h2>
  <p class="fluent-body">5 running</p>
  <button class="fluent-button fluent-button-primary">View details</button>
</section>
```

## Migration Cheatsheet
- fluent-card → <Card>
- fluent-title → <Title3>
- fluent-button-primary → <Button appearance="primary">
- fluent-nav-vertical → <Nav orientation="vertical">

## Styling
Prototype: CSS variables (`--colorBrandBackground`, etc.).
Fluent UI v9: theme tokens (`theme.colorBrandBackground`, `theme.colorNeutralBackground1`).