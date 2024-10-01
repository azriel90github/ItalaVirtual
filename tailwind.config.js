/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      colors: {
        colorFundo: "#64395C",
        colorText1: "#38122F", // Cor de Fundo
      },
			fontFamily: {
				sans: "Inter",
			},
		},
	},
	plugins: [],
};

