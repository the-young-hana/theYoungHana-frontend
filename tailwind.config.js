/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hanaGreen: "#008485",
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
        "3xl": ["2px 4px 3px rgba(0, 0, 0, 0.4)"],
      },
      animation: {},
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
