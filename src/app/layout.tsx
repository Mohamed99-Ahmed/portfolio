import { Geist } from "next/font/google";
import './globals.css';
import Cursor from "@/components/Cursor/Cursor";
import { ThemeProvider } from "@/hooks/useTheme";

const geist = Geist({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"],
  style:["normal"],
  variable: "--font-geist",
});

export const metadata = {
  title: 'Mohamed Ahmed',
  description: 'Frontend Developer — Animation Lover — UI/UX Creator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try{
    var t=localStorage.getItem('portfolio-theme');
    if(t) document.documentElement.setAttribute('data-theme',t);
  }catch(e){}
})();`,
          }}
        />
      </head>
      <body className={`${geist.className} bg-back text-gray-200`} suppressHydrationWarning>
        <ThemeProvider>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
