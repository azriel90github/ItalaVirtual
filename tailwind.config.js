/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      colors: {
        colorFundo: "#64395C",
        colorText1: "#38122F",
        colorButton: "#99658F",
      },
			fontFamily: {
				sans: "Inter",
			},
		},
	},
	plugins: [],
};

