/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				colorFundo: "#64395C",
				colorText1: "#38122F",
				colorButton: "#99658F",
        colorHover: "#462940",
        buttonColor: "#38122F",
			},
			fontFamily: {
				sans: "Inter",
			},
			boxShadow: {
				shape:
					"0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 8px rgba(153, 101, 143, 0.1), 0px 4px 4px rgba(153, 101, 143, 0.1), 0px 2px 2px rgba(153, 101, 143, 0.1), 0px 0px 0px 1px rgba(153, 101, 143, 0.1), inset 0px 0px 0px 1px rgba(153, 101, 143, 0.03), inset 0px 1px 0px rgba(153, 101, 143, 0.03)",
			},
		},
	},
	plugins: [],
};

