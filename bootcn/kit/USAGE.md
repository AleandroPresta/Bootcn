# Bootcn Reusable Kit

This folder is generated so you can copy only a few files into a future project.

## Generate kit files

From the Bootcn project root:

npm run build:kit

## One-command export to another project

You can generate and copy in one command:

npm run build:kit -- --out ../MyProject/wwwroot/bootcn

Also supported:
- npm run build:kit -- ../MyProject/wwwroot/bootcn
- BOOTCN_OUT=../MyProject/wwwroot/bootcn npm run build:kit

This exports these files directly to the destination folder:
- bootcn-theme.css
- bootstrap.bundle.min.js
- bootcn-init.js
- USAGE.md

This creates:
- kit/bootcn-theme.css
- kit/bootstrap.bundle.min.js
- kit/bootcn-init.js

## What to copy

### Full component support (recommended)

Copy these 3 files into the target project, for example:
- assets/bootcn-theme.css
- assets/bootstrap.bundle.min.js
- assets/bootcn-init.js

### CSS-only mode (no interactive Bootstrap JS)

Copy only:
- assets/bootcn-theme.css

Use this if the target project does not need dropdown, modal, offcanvas, tooltip, popover, collapse, or toast behavior.

## HTML setup in the target project

Add these tags:

```html
<link rel="stylesheet" href="assets/bootcn-theme.css">
<script src="https://unpkg.com/lucide@latest"></script>
<script src="assets/bootstrap.bundle.min.js"></script>
<script src="assets/bootcn-init.js"></script>
```

Optional font setup (for exact visual match):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Blazor setup

Copy the same generated files into your Blazor static assets folder:
- wwwroot/bootcn/bootcn-theme.css
- wwwroot/bootcn/bootstrap.bundle.min.js
- wwwroot/bootcn/bootcn-init.js

### Blazor Web App (.NET 8+, App.razor)

Add inside the app shell head/body script sections:

```razor
<link rel="stylesheet" href="bootcn/bootcn-theme.css" />
<script src="https://unpkg.com/lucide@latest"></script>
<script src="bootcn/bootstrap.bundle.min.js"></script>
<script src="bootcn/bootcn-init.js"></script>
```

### Blazor Server (Pages/_Host.cshtml) or Blazor WebAssembly (wwwroot/index.html)

Add the same 4 tags in the host page.

If your Blazor app already includes Bootstrap from the default template, remove that default Bootstrap CSS/JS include to avoid double-loading and style conflicts.

## Notes

- The CSS bundle already includes Bootstrap component styles plus Bootcn overrides.
- The Bootstrap JS bundle enables interactive components like modal, dropdown, offcanvas, tooltip, and popover.
- bootcn-init.js only initializes Lucide icons when present.
- If Lucide is not required, you can omit both the Lucide CDN script and bootcn-init.js.
