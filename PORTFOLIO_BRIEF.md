# Portfolio Design and Maintenance Brief

Updated: 2026-10-12

## Purpose

This document records the approved direction and maintenance rules for Li Pui Ka's portfolio. It describes the implemented site rather than an early proposal.

Follow the user's latest approved decisions first, then the current Design Comp and this brief. Inspect the current source before editing. Do not redesign the site or introduce project facts without approval.

## Positioning

- Name: Li Pui Ka / リプイカ
- Background: from Hong Kong, based in Tokyo
- Intended roles: Web Designer / Web Creator / Digital Designer
- Education: HAL Tokyo, WEB Design Major; expected graduation March 2027
- Focus: information that communicates a site's purpose, visual presentation that encourages further reading, and a clear browsing experience
- Personal contribution: photography, image selection, content organisation, layout and web implementation

Keep the wording natural and specific. Explain a design intention, the choice made and where it appears. Distinguish intended benefits from measured outcomes. Do not claim user testing or results without evidence.

## Stack and structure

The site uses plain HTML, CSS and vanilla JavaScript. Preserve this stack; no framework migration or animation library is needed.

- `index.html`: Hero, Work, About, Contact and footer
- `work01.html`–`work08.html`: eight case studies
- `css/style.css`: shared styles and Home
- `css/responsive.css`: shared responsive styles
- `css/work.css`: case-study styles
- `js/main.js`: shared interactions and Home project showcase
- `js/work-detail.js`: other-project links on case-study pages
- `js/translations.js`: Japanese, English and Traditional Chinese copy
- `js/language.js`: language selection and translated content
- `image/optimized`: published WebP assets and export manifest
- `scripts`: image export utilities

## Visual direction and typography

Use photography, generous whitespace and restrained typography to give the site a personal identity while keeping navigation and content clear.

- Navigation and major section headings: Aboreto, weight 400
- Hero heading: Abhaya Libre ExtraBold, weight 800
- Hero catchphrase: small Japanese sans-serif text
- Body: DM Sans with Japanese and Traditional Chinese fallbacks
- Home project captions: Helvetica Neue / Helvetica / sans-serif
- Case-study All works captions: the same Helvetica family, weight 500, smaller than the earlier bold version
- All works image-to-caption gap: 16px

Use the stylesheet as the source for current sizes, spacing and responsive values. Avoid synthetic bold for Aboreto.

## Home and navigation

The section order is Hero → Work → About → Contact.

The header is transparent with white text over the Hero and returns to the standard theme colours below it. No section is marked active while the Hero is in view. The logo returns to the top. Mobile navigation is positioned at the bottom of the viewport.

The favicon reads `KA` in white on a dark background.

### Hero

Use the supplied seaside sunset photograph. Place the staggered `WEB DESIGN` / `PORTFOLIO` heading together in the open sky, with the catchphrase:

> 伝えたいことを、見たくなるかたちに。

The photograph fades in first, followed by the title. On scroll, the Hero shrinks upwards and fades out as Work moves into view. Respect reduced-motion preferences. Preserve the approved photo colour, crop and text placement; do not add a heavy overlay or an extra CTA.

Loading appears for opening or reloading Home and returning from a case study. Case-study pages have no loading screen. Same-page section navigation does not restart loading.

### Work

Showcase presents one large central project with smaller adjacent projects, so each project can receive attention. Eight numbered controls and scrolling change the active project. The main image opens its case study.

`View all works` switches to an overview; `Back to showcase` returns to the focused presentation. On desktop, preserve both browsing paths. At widths of 620px or below, show only the All works list, with no showcase controls or scroll steps. Initialise this view before the loading screen finishes, so Work does not reserve showcase scroll space. Keep the current display order:

季の美 → MOMENTS IN INAGE → 春の手帖 → スノースケープ湯沢 → HAL Boulangerie → CAFÉ de PARIS → COCOON NAVIGATION → PORTFOLIO.

Asset numbers identify projects; they do not determine the Home display order.

### About

Keep the circular portrait and interests alongside the biography on desktop, with a single-column reading order on mobile.

The biography explains the transition from clinic work in Hong Kong to Japanese language school and then Web Design at HAL Tokyo. It connects the interest in visual presentation and understandable information to the enjoyment of selecting photographs, organising content and composing pages.

Place `Web Designer / Web Creator / Digital Designer` beneath the name. Retain Education, Focus, Tools and Languages. A separate Strengths section is not required. Do not add age, unrelated employment history or unsupported claims about business-level language skills.

Use the approved language levels and scores in the shared copy: Cantonese as a native language, Mandarin communication ability, English ability with TOEIC 795, and Japanese ability with JLPT N2.

### Contact

Use the supplied email and confirmed Instagram, LinkedIn and GitHub links. Keep SVG social icons monochrome at rest, with the approved hover colours:

- Instagram: `#D238AF`
- LinkedIn: `#0470AE`
- GitHub: `#8700BA`

The email is revealed from right to left once when Contact enters view. Keep the complete mailto link accessible, reveal it immediately on keyboard focus, and respect reduced-motion preferences.

## Language and themes

Japanese is the default on first visit. Remember the user's selected language and theme across pages.

Translate About details and case-study content. Keep the established navigation and section labels in English, project names in their approved form, and the Hero catchphrase in Japanese. Case-study field labels retain English with a smaller Japanese or Traditional Chinese translation; English has no duplicate translation.

The globe control and its menu use restrained transparent glass styling. Use white menu text over the Hero and theme-appropriate text below it. Preserve visible keyboard focus.

Light mode is the default. Dark mode uses a near-black background and warm-white text, including case-study descriptions. Do not invert photographs or mockups.

## Case-study content

Use the shared fields:

Range, Tools, Technologies, Overview, Purpose, Target, Information, Design, Period and Timing.

- Overview: what the project is and any school-assignment context
- Purpose: what it aims to communicate or help users do
- Target: who the content is intended for
- Information: content order, grouping and paths through the site
- Design: reasons for visual and interaction choices, connected to specific screens
- Range: actual personal responsibilities, especially for group work

Use users / 使用者 / ユーザー consistently. Avoid repeating the same explanation in Information and Design. Do not invent wireframes or process artefacts; existing finished designs can support explanations. Keep CAFÉ de PARIS identified as a desktop-only work.

Final design figures have Desktop / Mobile or feature-specific captions. PORTFOLIO additionally explains the Showcase / All works switch. All works at the bottom links to the other seven projects.

## Project and asset numbering

| ID | Project | Mockup | Design Comp prefix |
|---|---|---|---|
| 01 | COCOON NAVIGATION | mockup01 | work01_designcomp |
| 02 | CAFÉ de PARIS | mockup02 | work02_designcomp |
| 03 | HAL Boulangerie | mockup03 | work03_designcomp |
| 04 | スノースケープ湯沢 | mockup04 | work04_designcomp |
| 05 | HARU NO TECHOU / 春の手帖 | mockup05 | work05_designcomp |
| 06 | MOMENTS IN INAGE | mockup06 | work06_designcomp |
| 07 | 季の美 | mockup07 | work07_designcomp |
| 08 | PORTFOLIO | mockup08 | work08_designcomp |

Feature suffixes identify mobile, navigation, quiz, quiz result and overview images. PORTFOLIO uses `work08_designcomp_work` for its overview screenshot. Its production period is approximately 14 days, September–October 2026.

MOMENTS uses the updated sea-view mockup rather than the earlier sunset-person opening image. Its current desktop export has four parts and mobile export has ten parts.

Original PNG/JPEG files are retained locally and excluded through `.gitignore`. Published pages reference WebP in `image/optimized`. Replacing an original image does not update the published image automatically: re-export the relevant WebP, update the manifest and any changed part counts or dimensions, and update cache versions in HTML and JavaScript references. Check srcset as well as src.

Verify image content visually before renaming; matching a filename alone does not establish the correct project. Use temporary filenames when swapping numbers to prevent overwrites. Do not publish local browser-test records or a nested repository folder.

## Maintenance and release checks

Make the smallest necessary change and preserve unrelated content and styling. Check representative desktop, tablet and mobile layouts when changing layout. Check keyboard access, active navigation, language/theme persistence, overflow and reduced-motion behaviour when those features are affected.

For asset changes, confirm the actual image, valid paths, responsive variants and cache refresh. Run JavaScript syntax checks after script edits. Clearly distinguish source checks from browser verification.

The eight cases and Home are implemented. The next release step is GitHub publication and GitHub Pages deployment, followed by checking the actual published URL, direct case-study links, images, language/theme controls, mobile layout and contact links.

The existing review report records previous checks and their limits. Do not present it as complete testing on every browser, physical device or assistive technology.
