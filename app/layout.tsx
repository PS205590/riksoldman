import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: "Riksoldman",
  description: "A wiseoldman clone for College, with the unique name of Riksoldman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
