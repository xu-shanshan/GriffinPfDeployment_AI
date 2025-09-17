# fluent-mapping.md – HTML → Fluent UI v9 Mapping Reference

## Buttons
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<button class="fluent-button">` | `<Button>` | Use `appearance="primary"` for main actions |

## Inputs
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<input type="text" class="fluent-input">` | `<Input>` | Use `placeholder` and `value` binding |
| `<textarea>` | `<Textarea>` | Auto-resize via `resize="vertical"` |

## Tables
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<table class="fluent-table">` | `<Table>` | Supports sorting, pagination, and selection |

## Modals / Dialogs
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<div class="modal">` | `<Dialog>` | Use `modalProps` for accessibility |

## Cards / Panels
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<div class="card">` | `<Card>` | Use `<CardHeader>` and `<CardBody>` |

## Checkbox / Radio / Toggle
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<input type="checkbox">` | `<Checkbox>` | Controlled via `checked` and `onChange` |
| `<input type="radio">` | `<Radio>` | Grouped with `name` attribute |

## Dropdown / Select
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<select>` | `<Dropdown>` | Options passed via `items` array |

## Navigation / Menu
| HTML Prototype | Fluent UI v9 | Notes |
|----------------|--------------|-------|
| `<nav>` | `<Nav>` | Supports nested links, collapse |

## Global Styles / Layout
- Global CSS → `global.css`
- Common layout → `<AppHeader />`, `<Sidebar />`, `<AppFooter />`
- Theming → Fluent UI `ThemeProvider`



## Notes
- Always prioritize accessibility and responsive layout.
- Use this file as reference for consistent conversion.
- Update mapping whenever a new UI pattern is introduced.
