module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#313131",
        secondary: "#4D4D4D",
        terciary: "#8F8F8F",
        background: "#FBFBFB",
        firstTab: "rgba(217,217,217,0.43)",
        secondTab: "rgba(255,128,128,0.43)",
        thirdTab: "rgba(255,235,128,0.43)",
        fourthTab: "rgba(162,255,177,0.39)",
      },
      spacing: {
        "1/12": "8.33333333333333%",
        "2/12": "16.66666666666667%",
        "3/12": "25%",
        "4/12": "33.33333333333333%",
        "5/12": "41.66666666666667%",
        "6/12": "50%",
        "7/12": "58.33333333333333%",
        "8/12": "66.66666666666667%",
        "9/12": "75%",
        "10/12": "83.33333333333333%",
        "11/12": "91.66666666666667%",
        leftBar: "6.166666666666667%",
        "3/24": "12.5%",
        "21/24": "87.5%",
      },
      boxShadow: {
        default: "0px -1px 4px rgba(0, 0, 0, 0.25);",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
