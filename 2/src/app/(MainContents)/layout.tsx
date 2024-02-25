import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Navbar from "../../components/MainContentsLayout/Navbar"
import React from "react";
import Header from "@/components/MainContentsLayout/Header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Main contents",
    description: "App",
};

export default function MainContentsLayout({
                                               children,
                                           }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className={`${inter.className} w-full h-full`}>
            <header>
                <Navbar/>
            </header>

            <main className={"w-full h-full overflow-y-auto"}>
                {children}
            </main>
        </div>

    );
}
