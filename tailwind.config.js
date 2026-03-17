/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        figmaDark: {
          "color-scheme": "dark",
          "base-100": "#11140B",
          "base-200": "#383B2B",
          "base-300": "#161910",
          "base-content": "#EDE9DE",
          "primary": "#798156",
          "primary-content": "#11140B",
          "secondary": "#989D7B",
          "secondary-content": "#11140B",
          "accent": "#EDE9DE",
          "accent-content": "#11140B",
          "neutral": "#202514",
          "neutral-content": "#EDE9DE",
          "info": "#3abff8",
          "info-content": "#11140B",
          "success": "#36d399",
          "success-content": "#11140B",
          "warning": "#fbbd23",
          "warning-content": "#11140B",
          "error": "#f87272",
          "error-content": "#11140B",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
        figmaLight: {
          "color-scheme": "light",
          "base-100": "#FAFAF6",     // Soft warm cream
          "base-200": "#F1EFE6",     // Slightly darker cream for cards
          "base-300": "#EAE7DA",     // Deeper cream
          "base-content": "#202514", // Dark olive for text (high contrast)
          "primary": "#5A633F",      // Slightly darker olive green for buttons
          "primary-content": "#FAFAF6",
          "secondary": "#6A7051",    // Medium olive for secondary text
          "secondary-content": "#FAFAF6",
          "accent": "#202514",
          "accent-content": "#FAFAF6",
          "neutral": "#E1DFCF",
          "neutral-content": "#202514",
          "info": "#3abff8",
          "info-content": "#FAFAF6",
          "success": "#36d399",
          "success-content": "#FAFAF6",
          "warning": "#fbbd23",
          "warning-content": "#FAFAF6",
          "error": "#f87272",
          "error-content": "#FAFAF6",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        }
      }
    ],
  },
}
