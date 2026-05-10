/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "outline": "#737780",
        "primary-container": "#003366",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "primary-fixed-dim": "#a7c8ff",
        "surface-dim": "#dad9de",
        "surface-container-low": "#f4f3f8",
        "on-primary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#2f3034",
        "background": "#f9f9fe",
        "surface-tint": "#3a5f94",
        "tertiary-fixed-dim": "#ffb690",
        "on-error": "#ffffff",
        "tertiary-container": "#592300",
        "surface-container": "#eeedf2",
        "surface-bright": "#f9f9fe",
        "on-tertiary-fixed": "#341100",
        "on-surface": "#1a1c1f",
        "tertiary-fixed": "#ffdbca",
        "on-secondary-fixed": "#002022",
        "surface": "#f9f9fe",
        "primary-fixed": "#d5e3ff",
        "on-primary-fixed": "#001b3c",
        "tertiary": "#381300",
        "on-secondary-fixed-variant": "#004f54",
        "secondary-container": "#7af1fc",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#1f477b",
        "on-tertiary-fixed-variant": "#723610",
        "on-secondary-container": "#006e75",
        "secondary-fixed": "#7df4ff",
        "error-container": "#ffdad6",
        "surface-variant": "#e2e2e7",
        "inverse-primary": "#a7c8ff",
        "on-surface-variant": "#43474f",
        "inverse-on-surface": "#f1f0f5",
        "on-background": "#1a1c1f",
        "on-tertiary-container": "#d8885c",
        "primary": "#001e40",
        "surface-container-high": "#e8e8ed",
        "on-primary-container": "#799dd6",
        "outline-variant": "#c3c6d1",
        "secondary-fixed-dim": "#5dd8e2",
        "secondary": "#006970",
        "surface-container-highest": "#e2e2e7"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "gutter": "24px",
        "container-max": "1440px",
        "base": "8px",
        "margin-mobile": "16px",
        "margin-tablet": "32px",
        "margin-desktop": "64px"
      },
      "fontFamily": {
        "body-sm": ["Inter"],
        "body-lg": ["Inter"],
        "data-mono": ["Inter"],
        "display-lg-mobile": ["Public Sans"],
        "headline-lg": ["Public Sans"],
        "label-bold": ["Inter"],
        "display-lg": ["Public Sans"],
        "body-md": ["Inter"],
        "headline-md": ["Public Sans"]
      },
      "fontSize": {
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "data-mono": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
        "display-lg-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "label-bold": ["14px", { "lineHeight": "16px", "fontWeight": "600" }],
        "display-lg": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }]
      },
      "keyframes": {
        "ticker": {
          "0%": { "transform": "translateX(0)" },
          "100%": { "transform": "translateX(-50%)" }
        }
      },
      "animation": {
        "ticker": "ticker 30s linear infinite"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
