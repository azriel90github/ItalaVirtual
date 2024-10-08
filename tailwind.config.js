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
				buttonColor3: "#5c1e4d",
				buttonColor2: "#64395C",
				headerColor: "#99658F",
				headerColor2: "#99658f91",
				searchColor: "#7C4A73",
				moneyColor: "#22c55e",
				colorRemove: "#dc2626",
				colorStar: "#d946ef",
				colorInput: "#8C5B83",
				colorExtra: "#955573",
			},
			fontFamily: {
				sans: "Inter",
			},
			boxShadow: {
				shape:
					"0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 8px 0px 4px 4px rgba(153, 101, 143, 0.1), 0px 2px 2px rgba(153, 101, 143, 0.1), 0px 0px 0px 1px rgba(153, 101, 143, 0.1), inset 0px 0px 0px 1px rgba(153, 101, 143, 0.03), inset 0px 1px 0px rgba(153, 101, 143, 0.03)",
			},

			backgroundImage: {
				fundoHome: "url('/ice-cream 2.png')",
			},
		},
	},
	plugins: [],
};

