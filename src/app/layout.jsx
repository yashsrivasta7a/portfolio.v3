import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
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
  title: "Yash Srivastava | Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Yash Srivastava - A passionate Full Stack Developer specializing in modern web technologies, AI/ML, and building exceptional digital experiences.",
  keywords: [
    "Yash Srivastava",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "React",
    "Next.js",
    "AI",
    "Machine Learning",
  ],
  authors: [{ name: "Yash Srivastava" }],
  creator: "Yash Srivastava",
  metadataBase: new URL("https://www.yashsrivasta7a.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.yashsrivasta7a.in",
    siteName: "Yash Srivastava Portfolio",
    title: "Yash Srivastava | Full Stack Developer & AI Enthusiast",
    description:
      "A passionate Full Stack Developer specializing in modern web technologies, AI/ML, and building exceptional digital experiences.",
    images: [
      {
        url: "/images/admin.jpg",
        width: 1200,
        height: 630,
        alt: "Yash Srivastava - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Srivastava | Full Stack Developer & AI Enthusiast",
    description:
      "A passionate Full Stack Developer specializing in modern web technologies, AI/ML, and building exceptional digital experiences.",
    images: ["/images/admin.jpg"],
    creator: "@YashSrivasta7a",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.yashsrivasta7a.in",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yash Srivastava",
    url: "https://www.yashsrivasta7a.in",
    image: "https://www.yashsrivasta7a.in/images/admin.jpg",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://www.github.com/yashsrivasta7a",
      "https://www.linkedin.com/in/yashsrivasta7a",
      "https://www.twitter.com/YashSrivasta7a",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f7f4] selection:bg-orange-200`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: "7.5s" }} />
          <div className="relative z-1000 ">
            <NavbarWrapper />
          </div>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
