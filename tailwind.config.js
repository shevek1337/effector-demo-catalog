/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./index.html", "./src/**/*.{react,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
      },
      boxShadow: {
        "offset-black": "4px 4px black",
        "offset-purple": "5px 5px #9147ff",
        "offset-sm": "2px 2px black",
      },
      transform: ["hover", "focus"],
    },
  },
  variants: {
    extend: {
      translate: ["group-hover", "hover"],
      transform: ["group-hover", "hover"],
    },
  },
  plugins: [],
}
