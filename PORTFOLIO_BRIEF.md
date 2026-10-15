# Portfolio Design and Maintenance Brief

Updated: 2026-10-15

## Purpose

This document records the approved direction and maintenance rules for Li Pui Ka's portfolio. It describes the implemented site rather than an early proposal.

Follow the user's latest approved decisions first, then the current Design Comp and this brief. Inspect the current source before editing. Do not redesign the site or introduce project facts without approval.

## Positioning

- Name: Li Pui Ka / リプイカ
- Background: from Hong Kong, based in Tokyo
- Intended roles: Web Designer / Web Creator / Digital Designer
- Education: HAL Tokyo, WEB学科・WEBデザイン専攻; expected graduation March 2027
- Focus: information that communicates a site's purpose, visual presentation that encourages further reading, and a clear browsing experience
- Personal contribution: site structure, asset selection, visual and interaction direction, and reviewing the rendered pages to decide revisions. Codex assists with design proposals, copy organisation and HTML/CSS/JavaScript implementation. Describe the review–revision process without implying independent code authorship or measured user-test results.

Keep the wording natural and specific. Explain a design intention, the choice made and where it appears. Distinguish intended benefits from measured outcomes. Do not claim user testing or results without evidence.

## Stack and structure

The site uses plain HTML, CSS and vanilla JavaScript. Preserve this stack; no framework migration or animation library is needed.

- `index.html`: Hero, Work, About, Contact and footer
- `work01.html`–`work08.html`: eight case studies
- `css/style.css`: shared styles and Home
- `css/responsive.css`: shared responsive styles
- `css/work.css`: case-study styles
- `css/dreamcore.css`: shared final Dreamcore surfaces, Hero, navigation and responsive overrides
- `css/review.css`: readable case-study text and image zoom dialog
- `js/main.js`: shared interactions and Home project showcase
- `js/home-intro.js`: interruptible opening sequence, inert state and focus restoration
- `js/hero-scroll.js`: scroll-linked Hero typography
- `js/about-interests.js`: direct photo switching without resetting between tags
- `js/work-reveal.js`: project-card fades
- `js/glass-highlight.js`: pointer-responsive glass highlights
- `js/work-detail.js`: other-project links on case-study pages
- `js/translations.js`: Japanese, English and Traditional Chinese copy
- `js/language.js`: language selection and translated content
- `image/optimized`: published WebP assets and export manifest
- `scripts`: image export utilities

## Visual direction and typography

Use an interface animation, generous whitespace and clear typography to give the site a personal identity while keeping navigation and content clear.

- Navigation: DM Sans, weight 500
- Hero name and major section headings: Cormorant Garamond, weight 400
- Hero eyebrow: WEB DESIGN PORTFOLIO
- Hero caption: Think beyond the idea.
- Body: DM Sans with Japanese and Traditional Chinese fallbacks
- Home and case-study project captions: Helvetica Neue / Helvetica / sans-serif
- Single light theme, dark blue text and a white transparent glass capsule
- Dreamcore accents: #a9d9ea, #f7b5a1, #ffcd75, #ff6e61, #a3d2ca; avoid yellow Work hover

Use the stylesheet as the source for current sizes, spacing and responsive values. Avoid synthetic bold for Aboreto.

## Home and navigation

The section order is Hero → Work → About → Contact.

The header shares the content width on desktop. Home, Work, About and Contact remain centred; the language control is on the right. At 620px or below the entire capsule sits at the bottom, respecting the safe area. Active navigation follows the section in view, with a bottom-of-page Contact override. Dark text, a stable glass fill and visible focus indicators keep navigation readable over both clouds and content.

The favicon reads `KA` in white on a dark background.

### Hero

The current sky originates from the user's own cloud photograph. AI assistance expanded it horizontally and produced a separate transparent cloud layer. Do not describe it as generated hills/cottage scenery. Cloud motion and a soft light layer remain CSS effects. Keep live Hero text legible in front of the cloud layer. The sky remains fixed as scrolling enlarges and fades the heading, then reveals Work.

Initial index loads and Home clicks trigger the opening. First playback retains the approved slow timing (1250ms hold + 350ms loader fade + 2300ms heading); subsequent Home clicks use 200ms + 250ms + 1100ms. Asset/font readiness can add wait time, capped at 6 seconds for the entire run. No Skip intro button is displayed. Escape or Tab cancels the sequence, restores the surfaces and returns focus to Home. Hidden header, main, footer and skip link are inert during playback. Cancelled promises must not finish a later playback. Reduced motion bypasses the decorative sequence. Do not reintroduce the removed glass cursor or motion-pause panel.

### Work

Showcase presents one large central project with smaller adjacent projects, so each project can receive attention. Eight numbered controls and scrolling change the active project. The main image opens its case study.

`View all works` switches to an overview; `View showcase` returns to the focused presentation. The first Showcase switch uses the Work start position rather than an uninitialised zero scroll position. Later returns clamp the saved position to the current Work range. On desktop, preserve both browsing paths. At widths of 620px or below, show only the All works list, with no showcase controls or scroll steps. Initialise this view before the loading screen finishes, so Work does not reserve showcase scroll space. The revised order is:

スノースケープ湯沢 → HAL Boulangerie → 季の美 → COCOON NAVIGATION → MOMENTS IN INAGE → 春の手帖 → CAFÉ de PARIS → PORTFOLIO.

Asset numbers identify projects; they do not determine the Home display order.

### About

Keep the circular portrait and interests alongside the biography on desktop, with a single-column reading order on mobile. Place the Hong Kong reset chip and three centred rows of two interest chips below the portrait; chip widths follow their labels. Hover, keyboard focus and tap reveal the corresponding photo after a 240ms fill. Switching between tags must keep the current photo until the new one is ready; only the Hong Kong chip resets it.

The biography explains the transition from clinic work in Hong Kong to Japanese language school and then Web Design at HAL Tokyo. It connects the interest in visual presentation and understandable information to the enjoyment of selecting photographs, organising content and composing pages.

Place `Web Designer` beneath the name in all three languages; do not prefix it with aspiring, 志望 or 應徵. Retain Education, Focus, Tools and Languages. A separate Strengths section is not required. Do not add age, unrelated employment history or unsupported claims about business-level language skills.

List Cantonese, Mandarin, English and Japanese only. Do not display proficiency levels, scores or language certificates.

### Contact

Use the supplied email and confirmed Instagram, LinkedIn and GitHub links. Keep SVG social icons monochrome at rest, with the approved hover colours:

- Instagram: `#D238AF`
- LinkedIn: `#0470AE`
- GitHub: `#8700BA`

The email is revealed from right to left once when Contact enters view. Keep the complete mailto link accessible, reveal it immediately on keyboard focus, and respect reduced-motion preferences.

## Language and themes

Japanese is the default on first visit. Remember the user's selected language across pages. Use one light theme; there is no theme switch.

Translate About details and case-study content. Keep the established navigation and section labels in English, project names in their approved form, and the Hero caption in English. Case-study field labels retain English with a smaller Japanese or Traditional Chinese translation; English has no duplicate translation.

The globe control and its menu use restrained transparent glass styling. Use dark readable text on a stable light glass surface. Preserve visible keyboard focus.

Use one glossy glass theme with pointer-responsive edge highlights. Reading panels need enough background colour to separate text from the moving sky; do not sacrifice readability for minimum blur. Do not invert photographs or mockups.

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

Feature suffixes identify mobile, navigation, quiz, quiz result and overview images. PORTFOLIO uses the latest user-supplied mockup08, exported to 600/960/1600px WebP variants. It has no Final design gallery or current-preview paragraph/link. Its production period is approximately 14 days, September–October 2026: planning and wireframing 3 days, design 5 days, implementation 6 days (user-supplied breakdown).

MOMENTS uses the latest supplied sunset-person mockup (mockup06-v2). Its current desktop export has five parts and mobile export has nine parts.

Original PNG/JPEG files are retained locally and excluded through `.gitignore`. Published pages reference WebP in `image/optimized`. Replacing an original image does not update the published image automatically: re-export the relevant WebP, update the manifest and any changed part counts or dimensions, and update cache versions in HTML and JavaScript references. Check srcset as well as src.

Verify image content visually before renaming; matching a filename alone does not establish the correct project. Use temporary filenames when swapping numbers to prevent overwrites. Do not publish local browser-test records or a nested repository folder.

## Maintenance and release checks

Make the smallest necessary change and preserve unrelated content and styling. Check representative desktop, tablet and mobile layouts when changing layout. Check keyboard access, active navigation, language persistence, overflow and reduced-motion behaviour when those features are affected.

For asset changes, confirm the actual image, valid paths, responsive variants and cache refresh. Run JavaScript syntax checks after script edits. Clearly distinguish source checks from browser verification.

The eight cases and Home are implemented. The next release step is GitHub publication and GitHub Pages deployment, followed by checking the actual published URL, direct case-study links, images, language controls, mobile layout and contact links.

The existing review report records previous checks and their limits. Do not present it as complete testing on every browser, physical device or assistive technology.

## UI revision verification boundary

New cloud and About derivatives are recorded in image/optimized/review-assets-manifest.json. Keep the original photographs unchanged. Static asset size reduction is not a measured loading-time claim. Source checks and local browser verification do not establish the state of GitHub Pages; check the actual public version after deployment.

Latest user preference: clearer glass rather than thick reading panels. Header uses 16–38% fill alpha and 4px blur; Home sections and case-study article use 20–40% alpha and 3px blur. Preserve dark text, pointer-responsive rim highlights and one light theme.

Polished-glass adjustment: remove backdrop blur entirely on the Header and content surfaces (retain only slight saturation). Use 2–14% Header fill and approximately 1.5–10% section fill. Keep glossy edge highlights and local pointer reflections rather than a broad frosted wash. This supersedes the earlier 3px/4px blur settings.

Liquid-glass preview: glass-highlight.js creates local rounded-lens SVG displacement maps for each Header/section/article and applies them only through backdrop-filter. Text and controls remain unfiltered. A thin full-surface reflection accompanies the edge light. Pointer movement shifts reflections and gives only the Header a small perspective tilt; large content panels stay fixed. Touch and reduced-motion users do not receive pointer tilt. CSS reflection and fill remain the visual fallback where SVG backdrop filtering is unsupported; Safari/Firefox need separate verification.

Header reveal: after the loader fades, the Header opacity animates in parallel with the Hero heading, using the same 2300ms initial / 1100ms replay duration and easing. It remains inert until both complete. Escape/Tab and reduced motion restore the final visible state immediately.

Responsive correction: All works cards use natural height (aspect-ratio: auto) so image, title and metadata remain inside the card. Long titles may wrap. At 621–820px the desktop Header uses compact spacing to avoid overlap with the language control.

Work image effects: grid and All works cards reveal once after their image decodes, using differing short lamp-like opacity rhythms and stagger times. Mockups use an alpha-masked single mirror sweep on pointer hover. Reduced motion disables both effects; keyboard focus reveals immediately. The shine must remain within the mockup silhouette and must not cover captions.

Pointer Home clicks do not restore programmatic keyboard focus after the intro; keyboard-triggered playback or Escape/Tab still restore Home focus. Mockup reflections use alpha masks with soft shadows removed, aligned with the image padding and object-fit: contain. Missing masks must remain transparent.

Header interaction now uses a single sliding glass selection pill for hover, focus and active navigation, replacing perspective tilt. Interest tags have 44px targets, a visible glass fill, local reflections and a stronger selected/hover state; image switching remains unchanged.

Interest photo transitions now reuse two image layers for every selection, alternating right-to-left and left-to-right slide/fade over 460ms. Keep the current photo visible while the next loads; do not flash the Hong Kong default between interests. The Hong Kong reset also animates. Interest label weight is 420, using DM Sans variable weights 400–500.

Photo buffer correctness: remove srcset and sizes when reusing either portrait image layer, otherwise the original Hong Kong responsive candidate can override a newly assigned src. Verify currentSrc, not only the src attribute. Only the Hong Kong tag restores the default photo; blur, visibility changes and touch cancellation must not reset it.

Work captions are centred in the overview, Showcase and case-study All works. Hover underlines draw left to right under project titles. Showcase cards reserve 16px above/below and fit the image inside their frame so hover enlargement stays within the clipped work viewport. Photography now uses the supplied About_photography.jpg, exported as about-photography-v2-960.webp.

Latest supplied mockup08 is published as mockup08-v3-{600,960,1600}.webp across the homepage, Showcase, case hero and All works. The homepage has a glossy BACK TO TOP link at the bottom right, shown after scrolling one viewport; mobile placement clears the bottom navigation. It scrolls to Home without replaying the intro. Tools retains 実装・開発 and lists PHP / Python under 学習中 based on the user’s current studies.


## Final audit follow-up (2026-10-15)

Portfolio uses one fixed light palette; unused dark-theme CSS, toggle copy and forced theme attributes have been removed. At widths up to 620px, navigation uses 12px text and link targets at least 44px wide and 44px high. README compression totals refer to the eight current cloud/About files only, not page-wide network transfer.
