import type { Metadata } from "next";
import "./globals.css";
import AtmosphericOverlays from "@/components/ui/AtmosphericOverlays";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Madhan — UX/UI Designer",
  description:
    "Portfolio of Madhan, a UX/UI Designer turning ideas into intuitive experiences through research, design, and curiosity.",
  keywords: ["UX Designer", "UI Designer", "Product Design", "User Research", "Portfolio"],
  authors: [{ name: "Madhan" }],
  openGraph: {
    title: "Madhan — UX/UI Designer",
    description: "Turning ideas into intuitive experiences through research, design, and curiosity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-canvas text-text-primary font-body antialiased">
        <AtmosphericOverlays />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
