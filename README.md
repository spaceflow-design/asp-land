# ASP Land — Design Direction Preview

Website design preview for **ASP Land** — three distinct visual directions
built as vanilla HTML/CSS/JS wireframes for client review before Figma import.

## Live preview

**→ https://spaceflow-design.github.io/asp-land/**

## Structure

```
website/
├── index.html                  Landing chooser — 3 option cards
│
├── option-1/                   Editorial & Restrained (full site — 10 pages)
│   ├── index.html              Homepage
│   ├── about.html              Our Story · Vision · Values · Milestones
│   ├── portfolio-industrial.html
│   ├── portfolio-quang-yen.html
│   ├── portfolio-diem-thuy.html
│   ├── portfolio-hiep-cuong.html
│   ├── portfolio-canh-thuy.html
│   ├── portfolio-office.html
│   ├── news.html
│   └── contact.html
│
├── option-2/                   Institutional & Global (homepage)
│   └── index.html
│
├── option-3/                   Bold & In Motion (homepage)
│   └── index.html
│
└── shared/
    ├── css/                    fonts, tokens, reset
    ├── fonts/                  SVN-Gotham (Light / Book / Regular / Bold)
    ├── brand-graphic/          ASP Land logos
    ├── project-img/            Development renders (placeholder)
    └── js/                     site.js, vn-map.js, kcn-map.js
```

## Design directions

| # | Direction | References | Voice |
|---|-----------|------------|-------|
| 01 | **Editorial & Restrained** | Stockland · UOL | Minimal, whitespace, ESG-forward |
| 02 | **Institutional & Global** | WHA Industrial Estate | Financial-grade, data-led |
| 03 | **Bold & In Motion** | SK D&D · The Crown Estate | Kinetic, color-forward |

## Tech

- Vanilla HTML / CSS / JavaScript — no build step
- Leaflet + CartoDB tiles for maps
- SVN-Gotham self-hosted
- Static hosting via GitHub Pages

Prepared by **Savills Place · Savills Vietnam**.
