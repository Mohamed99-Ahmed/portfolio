import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // Center the container
      padding: '1rem', // Default padding for all screens
      screens: {
        sm: '600px', // Full width on small screens
        md: '700px', // Custom width on medium screens
        lg: '990px', // Custom width on large screens
        xl: '1050px', // Custom width on extra-large screens
        '2xl': '1200px', // Custom width on 2XL screens
      },
    },
    extend: {
      colors: {
        back: "#120D16",
        mcolor: "#7B52A1",
        scolor : "#31C38E",
      },
      spacing:{
        nav:'calc(100vh - 68px)'
      }
    },
  },
  plugins: [],
} satisfies Config;
