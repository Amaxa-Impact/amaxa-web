import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import FlowWithProvider from "./testlayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Amaxa Impact",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-8 pt-2 md:p-8 bg-background">
                <FlowWithProvider>
                  {children}
                </FlowWithProvider>
                <Toaster position="top-center" richColors />
              </main>
            </div>
            {modal}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
