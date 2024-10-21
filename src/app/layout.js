import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import localFont from "next/font/local";
import "react-photo-view/dist/react-photo-view.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Learn CSIT",
  description: "This website provides resources for CSIT students",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximunScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
