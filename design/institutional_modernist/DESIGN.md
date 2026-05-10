---
name: Institutional Modernist
colors:
  surface: '#f9f9fe'
  surface-dim: '#dad9de'
  surface-bright: '#f9f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf2'
  surface-container-high: '#e8e8ed'
  surface-container-highest: '#e2e2e7'
  on-surface: '#1a1c1f'
  on-surface-variant: '#43474f'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#006970'
  on-secondary: '#ffffff'
  secondary-container: '#7af1fc'
  on-secondary-container: '#006e75'
  tertiary: '#381300'
  on-tertiary: '#ffffff'
  tertiary-container: '#592300'
  on-tertiary-container: '#d8885c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#5dd8e2'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#723610'
  background: '#f9f9fe'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e7'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Public Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 16px
---

## Brand & Style
The brand personality is authoritative yet accessible, designed to bridge the gap between traditional academic prestige and modern digital efficiency. It targets a diverse user base—from students and faculty to administrative staff and public visitors—requiring a UI that feels reliable, organized, and high-functioning.

The design style is **Corporate / Modern**, leaning into a clean, flat aesthetic that prioritizes information density and legibility. It utilizes a structured grid to manage complex CMS data while employing subtle shadows to create a clear visual hierarchy. The overall emotional response should be one of confidence and clarity, ensuring that critical campus information is easily digestible on both personal devices and large-scale public displays.

## Colors
The palette is rooted in a **Deep Institutional Blue**, providing a foundation of trust and heritage. This is balanced by **Clean White** surfaces and **Light Gray** backgrounds (#F8F9FA) to prevent visual fatigue during long administrative sessions.

For calls-to-action and critical interactive elements, a vibrant **Teal** serves as the secondary accent, providing a modern "pop" that stands out against the conservative base colors without sacrificing professionalism. High-contrast ratios are strictly maintained (minimum 4.5:1 for body text, 7:1 for headlines) to ensure maximum readability on high-brightness public monitors and dashboards.

## Typography
The typography system uses **Public Sans** for headlines to convey an institutional, government-grade clarity. Its sturdy shapes and open counters make it exceptionally legible at large scales for signage and dashboard headers. 

**Inter** is utilized for body copy and administrative data due to its neutral, utilitarian nature and excellent tall x-height, which aids in reading dense rows of information. A specialized "Data Mono" style (using Inter's tabular figures) is reserved for IDs, dates, and numerical figures within the CMS to ensure vertical alignment in tables.

## Layout & Spacing
The design system employs a **Fixed Grid** for administrative dashboards to maintain predictable data density, while the public-facing CMS pages utilize a **Fluid Grid** for maximum reach across devices. 

A strict 8px spatial rhythm governs all padding and margins. For desktop displays (1280px+), a 12-column layout with 24px gutters is standard. On mobile devices, the system collapses to a 4-column layout with 16px margins. Information-heavy views should utilize "compact" spacing (4px/8px increments) to reduce scrolling, while public-facing marketing pages should use "spacious" increments (16px/24px/32px) to improve content digestion.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Low-contrast Outlines** to define hierarchy. Backgrounds are kept at the lowest level (Light Gray), while content containers are raised using White surfaces.

Depth is communicated through "Systemic Shadows"—highly diffused, low-opacity (10-15%) neutral shadows that suggest elevation without appearing decorative.
- **Level 0:** Background surfaces.
- **Level 1:** Standard cards and content blocks (1px border #E5E7EB).
- **Level 2:** Hover states and active dropdowns (Subtle 4px blur shadow).
- **Level 3:** Modals and critical alerts (12px blur shadow, centered).

## Shapes
The shape language is **Soft** (0.25rem), reflecting a modern, systematic approach that avoids the playfulness of fully rounded corners. This slight radius softens the "brutalist" edge of administrative tables and dashboards while maintaining a rigorous, professional appearance. 

Buttons and input fields follow this 4px standard radius, while larger containers like cards may use `rounded-lg` (8px) to create a clear distinction between the container and the elements within it.

## Components
- **Buttons:** Primary buttons use the accent Teal with white text for maximum visibility. Secondary buttons use the Institutional Blue as an outline. All buttons feature a 600-weight label for clarity.
- **Input Fields:** Designed with a 1px solid gray border that transitions to the Institutional Blue on focus. Labels are always visible above the field in `body-sm` bold.
- **Cards:** White background, 1px light gray border, and Level 1 elevation. Cards used in the CMS for "Quick Actions" include a secondary-colored icon in the top left.
- **Data Tables:** High-density layouts with subtle zebra-striping (#F8F9FA) and sticky headers. Row heights are fixed at 48px for standard views and 40px for compact views.
- **Chips/Badges:** Used for status indicators (e.g., "Active," "Pending"). They use low-saturation background tints of the status color with high-saturation text to ensure accessibility.
- **Public Monitors:** Specific "Display Mode" components feature increased font sizes and higher contrast ratios specifically for 10ft UI experiences.