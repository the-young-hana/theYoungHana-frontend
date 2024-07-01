/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hanaGreen: "#008485",
        hanaRed: "#D70037",
        hanaGray: "#F2F2F2",
        hanaGray2: "#B5B5B5",
        hanaBgGray: "#F9F9fB",
        dark: "#353a4e",
        dark2: "#454962",
      },
      width: {
        iPhone: "394px",
      },
      height: {
        iPhone: "844px",
      },
      minHeight: {
        "bottom-screen": "calc(100% - 107px)",
      },
      dropShadow: {
        "2.5xl": ["2px 4px 3px rgba(0, 0, 0, 0.1)"],
        "3xl": ["2px 4px 3px rgba(0, 0, 0, 0.4)"],
        base: ["2px 4px 3px rgba(0, 0, 0, 0.1)"],
      },
      animation: {
        tada: "tada 1.3s ease-in-out 0.5s infinite",
        zoomOut: "zoom-out 1.5s ease-in-out 0s 1",
        zoomIn: "zoom-in 1.5s ease-out 0s 1",
        zoomIn2: "zoom-in 0.5s ease-out 0s 1",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-200%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        tada: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        "zoom-out": {
          "0%": {
            opacity: 1,
          },
          "15%": {
            opacity: 0.8,
            transform: "scale3d(1.1, 1.1, 1.1)",
          },
          "100%": {
            opacity: 0,
            transform: "scale3d(0, 0, 0)",
          },
        },
        "zoom-in": {
          "0%": {
            opacity: 0,
            transform: "scale3d(0, 0, 0)",
          },
          "80%": {
            opacity: 0.8,
            transform: "scale3d(1.1, 1.1, 1.1)",
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animationDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
      },
    },
    plugins: [],
  },
};
