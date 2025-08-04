import {resolve} from 'path'
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths to match your project
    // "../../packages/csv-upload/src/**/*.{html,js,jsx,ts,tsx}"
      resolve(__dirname, "../../packages/csv-upload/src/**/*.{js,ts,jsx,tsx}"),

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}