import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideNav } from "@/components/sideNav";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Deploy Hub",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    <SideNav />
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        <Header />
                        {children}
                    </div>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
