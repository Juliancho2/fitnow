/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1F2937"
      },
      backgroundColor: {
        "btn": "#11E0F8"
      },
      backgroundImage: {
        "started": "url('/started.jpg')"
      },
      animation: {
        "loadPage": "load-page ease-in-out .5s ",
        "scaleImg": "scale ease-in-out .2s ",
        "sideBar": "sideBar ease-in-out .2s ",
        "closeSideBar": "CloseSideBar ease-in-out .2s ",
      },
      keyframes: {
        "load-page": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        "scale": {
          "0%": {
            transform: "scale(0)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        "sideBar": {
          "0%": {
            transform: "translatex(100vh)"
          },
          "100%": {
            transform: "translatex(0)"
          }
        
        }
      }
    },
  },
  plugins: [],
}

