import "./globals.css";
import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#050508",
};

export const metadata = {
  title: "Prosthetic — Bridging the Cognitive Gap",
  description:
    "AI that doesn't just chat — it thinks + executes autonomously. Local-first, WhatsApp-native, ADHD/dyslexia-friendly personal AI daemon.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@500;600;700;800&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Preload the video for faster first paint */}
        <link rel="preload" href="/bg-video.mp4" as="video" type="video/mp4" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <VideoBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
