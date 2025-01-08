import { Geist } from "next/font/google"; // Importing Geist font from next/font/google
import './globals.css';


// Load Geist font using Next.js font optimization
const geist = Geist({
  subsets: ['latin'], // You can add more subsets if needed
  weight: ["100", "300", "400", "500", "700", "900"], // Weights to load
  style:["normal"], // Styles to load
  variable: "--font-geist", // Variable name to use in CSS in var(--font-geist)
});

export const metadata = {
  title: 'Mohamed Ahmed',
  description: 'Frontend Developer ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${geist.className} bg-back text-gray-200`}> {/* Apply the Geist font globally */}
        {children}
      </body>
    </html>
  );
}
