/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				principal: "#F5D400",
				secondary: "#00781B",
			},
		},
	},
	plugins: [],
};
