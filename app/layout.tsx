import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CollabDoc",
  description:
    "Collaborative document management platform that allows users to create, edit, and share documents in real-time, offering seamless teamwork and cloud-based storage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize: "16px",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
