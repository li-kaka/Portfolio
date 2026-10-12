# PORTFOLIO BRIEF

## Purpose and source of truth

This document is the working source of truth for Li Pui Ka's portfolio. Read it before changing the project.

Priority when references disagree:

1. The latest approved Design Comp screenshot.
2. This brief.
3. The Figma file as a secondary reference: <https://www.figma.com/design/31uf9bBy3y0xiwfNiBcsMZ/Untitled?node-id=58-7>
4. Existing code only where it does not conflict with the approved design.

This is an implementation task, not an invitation to redesign. Older concepts such as an equal card grid, a React/Vite rebuild, pill tags, a full-page navy composition, or a generic portfolio template are superseded by the latest Design Comp.

## Positioning

- Name: Li Pui Ka / 李珮嘉
- Location and background: Hong Kong-born, based in Tokyo
- Primary positioning: Web Designer / Digital Designer
- Supporting strength: practical frontend implementation knowledge
- Current education: HAL Tokyo, Department of WEB — WEB Design Major
- Expected graduation: March 2027
- Target opportunities: web design, digital design, web production, and related junior roles in Japan

The portfolio should communicate that Li Pui Ka has visual judgment, can organise information clearly, understands responsive web production, and can carry ideas from design into implementation. It should not present her as a React engineer or overstate seniority.

Core English line:

> From Hong Kong to Tokyo. Exploring ideas through web and design.

Approved Japanese equivalent:

> 香港から東京へ。Webとデザインを通して、アイデアを探求する。

## Visual direction

The approved direction is **editorial × digital × photographic**: restrained, contemporary, image-led, and personal.

Keep:

- Generous whitespace and a clear hierarchy
- Strong photography and large project imagery
- Refined typography with restrained UI elements
- Editorial composition without sacrificing usability
- A consistent system across Home and future case studies
- Light mode as the default, with a considered dark mode

Avoid:

- Generic AI-generated portfolio styling
- SaaS-style heroes, bento layouts, equal card grids, or oversized rounded cards
- Glassmorphism, unnecessary gradients, decorative blobs, and excessive effects
- Pill-shaped category tags or repeated "School Project" badges
- Multicolour social icons in the resting state
- Inventing new sections, copy, colours, or interactions without approval
- Copying reference websites literally

The latest screenshot is authoritative for composition, alignment, spacing, image placement, and section rhythm. Do not replace those decisions with a more conventional template.

## Typography

Use this approved type system:

- Display and headings: `Aboreto`, weight 400; approximately 36px on desktop where appropriate
- Body copy: `DM Sans`, weight 400; base size approximately 14px, adjusted when needed for comfortable reading
- UI and small labels: `"Helvetica Neue", Helvetica, sans-serif`, weight 700; base size approximately 11px
- Use sensible fallbacks and never allow Times to appear as an accidental visible default

Use `Aboreto` selectively for major headings, project titles, and editorial accents. Navigation, metadata, body copy, years, categories, and controls should remain clear sans-serif text. Do not make all text decorative, oversized, thin, or low-contrast.

## Home page structure

Build and refine the Home page first. The approved order is:

1. Fixed global header
2. Hero
3. Work
4. About
5. Contact
6. Footer

Do not build or redesign project-detail pages until the Home page is approved.

### Header

- One fixed global header, not a repeated header inside every section
- Identity: `LI PUI KA`
- Navigation: `WORK`, `ABOUT`, `CONTACT`
- Language control and sun/moon theme control
- Active section underline/state should update as the page scrolls
- Keep the header visually light, legible, and keyboard accessible

### Hero

- Use the large sunset image shown in the approved Design Comp
- Image spans the width below the header
- Place the text in the upper-right/right-side sky area as designed
- Primary word: `PORTFOLIO`
- Supporting copy: `From Hong Kong to Tokyo. Exploring ideas through web and design.`
- Preserve the minimal composition; do not add CTA buttons
- Ensure `PORTFOLIO` remains readable over the bright sky without a heavy overlay

### Work

This is the main interaction and visual focus.

- Use a sticky, scroll-driven project showcase
- Present one main project at a time with a large device mockup/image
- Show project indicators `01 02 03 04 05 06`; clearly emphasise the active number
- Vertical scrolling updates the active image, number, title, and metadata
- The showcase can remain sticky while scroll sections drive state changes
- Use smooth, restrained transitions only
- Clicking the main image should lead to the corresponding detail page when that page exists
- Prefer CSS `position: sticky` plus small, understandable vanilla JavaScript
- Do not install an animation library
- Do not make scroll snapping feel forceful; usability takes priority
- On mobile, simplify or remove the sticky behaviour if needed rather than reproducing a fragile desktop effect

First real project:

- Title: `MOMENTS IN INAGE`
- Metadata: `Web Design / School Project · 2026` (plain text, not pills)

Other items may remain clearly labelled placeholders until real content is supplied. Do not invent final project facts.

### About

Use the approved two-column desktop composition: a large circular portrait on the left and structured copy on the right. On smaller screens it becomes a logical single-column reading order.

Left-side identity:

> Li Pui Ka 李珮嘉  
> Web Designer / Digital Designer  
> Tokyo, Japan

Right-side tagline:

> FROM HONG KONG TO TOKYO.  
> EXPLORING IDEAS THROUGH WEB AND DESIGN.

Approved English bio:

> I'm Li Pui Ka, a Hong Kong-born web designer currently based in Tokyo.
>
> My work focuses on web design, visual design and digital experiences, with an emphasis on clear structure, strong imagery and responsive layouts.
>
> With a practical understanding of HTML, CSS and JavaScript, I design with both visual quality and implementation in mind. I'm currently looking for opportunities in web design, digital design and web production where I can continue developing both my visual and technical skills.

Information groups:

- **Education:** HAL Tokyo; Department of WEB — WEB Design Major; Expected Graduation: March 2027
- **Focus:** Web Design; Digital Design; Responsive Design; Visual Design; Web Production
- **Tools:** Figma; HTML; CSS; JavaScript; PHP; Photoshop; Illustrator; VS Code; Git; Codex
- **Languages:** Cantonese; Mandarin; English; Japanese

Do not add a separate `WHAT I STUDY` section because it duplicates Education, Focus, and Tools. Keep the bio concise and avoid generic design-philosophy claims or an extended personal essay.

### Contact and footer

- Heading: `CONTACT`
- Large typographic email: `li.kaka.tokyo@gmail.com`
- Links: Instagram, LinkedIn, GitHub
- Social icons are monochrome by default; brand colours may appear on hover/focus
- Closing text: `Let's talk.`
- Footer: `© 2026 LI PUI KA`
- Do not add a contact form or large CTA button unless explicitly requested

## Light and dark mode

- Default to light mode
- Light: white or warm-white background with near-black text
- Dark: near-black (for example `#0c0c0c` or `#111`) with off-white text
- Keep composition and spacing identical between themes
- Do not invert photos or mockups
- Store the user's preference in `localStorage`
- Theme control must be a real button with an accessible name and visible focus state
- Check text and control contrast in both themes

## Multilingual content

Support:

- Japanese (default on first visit)
- English
- Traditional Chinese

The header globe opens the language choices. Remember the visitor's choice across Home and work pages. Shared copy lives in `js/translations.js`; language controls and text updates live in `js/language.js`. Current copy uses simple, direct wording for Web Designer / Digital Designer / Web Creator roles.

Use one shared layout and centralised content; do not maintain three duplicated websites. All meaningful navigation, hero, About, project metadata/descriptions, Contact labels, and future case-study labels must be translatable. Project names may remain in their original language where appropriate.

Translations should sound natural in each language and preserve meaning rather than follow English word-for-word. Switching language must not break layout, overflow controls, or reset the theme unexpectedly.

## Responsive behaviour

Validate at least:

- 1440px
- 1024px
- 768px
- 390px
- 375px
- 320px

Desktop should closely match the Design Comp. Tablet should reduce scale and spacing carefully. Mobile must be recomposed, not merely shrunk.

Mobile requirements:

- Compact, usable navigation
- Readable hero text over the image
- A Work experience that remains understandable without awkward sticky behaviour
- About in a logical single column
- Scalable contact email with no clipping
- Touch-friendly controls
- No horizontal scrolling
- No content hidden behind the fixed header
- Preserve hierarchy, image importance, and whitespace

Prefer fluid sizing with `clamp()` where it improves continuity, but keep breakpoints understandable and maintainable.

## Accessibility and quality baseline

- Semantic HTML and one logical `h1`
- Correct heading hierarchy
- Descriptive image `alt` text; empty `alt` for purely decorative images
- Keyboard-accessible navigation and controls
- Visible `:focus-visible` styles
- Adequate colour contrast in both themes
- Minimum practical touch targets
- Respect `prefers-reduced-motion`
- Do not depend on hover or motion to reveal essential information
- Avoid layout shifts and unnecessarily large assets

## Implementation constraints

- Use plain HTML, CSS, and minimal vanilla JavaScript
- Do not use React, Vite, a CSS framework, or an animation library
- Do not create a new framework project
- Follow the existing project structure and reuse suitable assets
- Prefer simple CSS and small focused scripts over abstractions
- Keep content, theme, language, and Work state understandable to a student who is still learning JavaScript
- Use CSS custom properties for colours, typography, spacing, and sizing
- Do not delete an older implementation without explicit approval; preserve it or work around it
- Do not add advanced animation until the page structure, real content, themes, languages, and responsive behaviour are stable

## Codex working rules

Before editing:

1. Read `AGENTS.md`, `README.md`, this file, and any relevant project documentation.
2. Inspect the real file tree and existing implementation.
3. Identify reusable assets and any user changes already present.
4. State which files will be changed and why.
5. Compare the current page with the latest Design Comp; do not rely on memory or a generic interpretation.

While editing:

- Make the smallest changes that satisfy the approved design
- Preserve existing naming and code style where reasonable
- Do not silently replace content, assets, or layout decisions
- Do not redesign under labels such as "improve UI" or "modernise"
- If the screenshot and code disagree, follow the screenshot unless doing so would cause an accessibility or functional problem; explain any necessary deviation
- Keep placeholders explicit
- Stop at the requested scope

Before reporting completion:

1. Run the site locally.
2. Check desktop, tablet, and mobile widths listed above.
3. Check for horizontal overflow and fixed-header overlap.
4. Test keyboard navigation, visible focus, and reduced motion.
5. Test section active state and the Work scroll interaction.
6. Test light/dark mode, persistence, and contrast.
7. Test EN/JP/Traditional Chinese switching and long-text layouts.
8. Confirm no framework or unnecessary dependency was added.
9. Compare screenshots against the latest Design Comp.
10. Report changed files, remaining placeholders, known differences, and items requiring manual review.

## Current phase and next review

The immediate goal is to review and refine the Codex-built Home page, not to expand scope. Review it against:

- Fidelity to the latest Design Comp
- Typography and spacing
- Fixed header and active navigation state
- Sticky/scroll-driven Work behaviour
- Light and dark mode
- Multilingual layout
- Responsive behaviour
- Accessibility and keyboard use
- Signs of generic AI-template styling

After the Home page is approved, create the first reusable case-study page for `MOMENTS IN INAGE`, then use that approved structure for the remaining projects.

Language scope: keep navigation, section headings, Home hero, Home work captions and Contact copy in English. Translate the About body/profile information and work detail descriptions and fields. Work titles keep their original names.

Home Hero update: follow TOP PAGE new4.png with staggered WEB DESIGN / PORTFOLIO lines and Ideas, made visible. Keep the header transparent with white text over the full-height photo, then restore the standard header when Work reaches it. Retain the entrance animation. The Hero image and text scroll naturally with the page into Work; crop the mobile photo around the person.
