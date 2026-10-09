import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreatorOS AI — AI Content Creator Marketplace",
  description: "Connect with verified AI creators, generate structured commercial briefs, and automate multimodal campaign production.",
  keywords: ["AI creators", "generative video", "Runway Gen-3", "Midjourney", "ComfyUI", "AI marketplace", "commercial licensing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#090a0f] text-zinc-100 selection:bg-violet-600 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
