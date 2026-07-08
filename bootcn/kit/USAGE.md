# Bootcn Reusable Kit (Manual Guide)

Use this kit by copying static files only. No build or export scripts are required.

## Files to copy

### Full component support (recommended)

Copy these files into your target app:
- bootcn-theme.css
- bootstrap.bundle.min.js
- bootcn-init.js

### CSS-only mode

Copy only:
- bootcn-theme.css

Use CSS-only mode if you do not need interactive Bootstrap behaviors such as modal, dropdown, offcanvas, tooltip, popover, collapse, or toast.

## Generic HTML setup

Place the copied files in your static assets folder, for example:
- assets/bootcn-theme.css
- assets/bootstrap.bundle.min.js
- assets/bootcn-init.js

Then add:

```html
<link rel="stylesheet" href="assets/bootcn-theme.css">
<script src="https://unpkg.com/lucide@latest"></script>
<script src="assets/bootstrap.bundle.min.js"></script>
<script src="assets/bootcn-init.js"></script>
```

Optional fonts for exact visual parity:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Blazor-first setup

Copy files to:
- wwwroot/bootcn/bootcn-theme.css
- wwwroot/bootcn/bootstrap.bundle.min.js
- wwwroot/bootcn/bootcn-init.js

### Blazor Web App (.NET 8+, App.razor)

Add references in the app shell:

```razor
<link rel="stylesheet" href="bootcn/bootcn-theme.css" />
<script src="https://unpkg.com/lucide@latest"></script>
<script src="bootcn/bootstrap.bundle.min.js"></script>
<script src="bootcn/bootcn-init.js"></script>
```

### Blazor Server (Pages/_Host.cshtml)

Add the same tags in the host page.

### Blazor WebAssembly (wwwroot/index.html)

Add the same tags in the host page.

## Important checks

- Remove default template Bootstrap CSS/JS to avoid double-loading conflicts.
- Keep only one Bootstrap source active (Bootcn kit).
- If you do not use Lucide icons, omit both the Lucide CDN script and bootcn-init.js.
- Set dark mode at root if desired:

```html
<html lang="en" data-bs-theme="dark">
```

## Behavior note

Bootstrap bundle covers component interactions (modal, dropdown, offcanvas, collapse, tabs, carousel).
Tooltips and popovers may still need initialization in app code depending on how your page is rendered.
