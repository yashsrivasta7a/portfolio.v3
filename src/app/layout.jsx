import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import {
  Cursor,
  CursorProvider,
} from "@/components/ui/shadcn-io/animated-cursor";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio",
  description: " YashSrivasta7a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f7f4] selection:bg-orange-200`}
      >
        <SmoothScroll>
          <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="relative z-1000 ">
            <NavbarWrapper />
          </div>
          <CursorProvider>
            <Cursor>
              <svg
                className="size-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <path
                  fill="currentColor"
                  d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                />
              </svg>
            </Cursor>
          </CursorProvider>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
