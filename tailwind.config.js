/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hanaGreen: "#008485",
        hanaGray: "#F2F2F2",
      },
      width: {
        iPhone: "394px",
      },
      height: {
        iPhone: "844px",
      },
    },
  },
  plugins: [],
};
