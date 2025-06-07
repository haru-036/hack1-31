import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/appWrapper";
import Header from "@/components/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BuildCha",
	description: "話して、作ろう。自分だけのまち。",
	openGraph: {
		title: "BuildCha",
		description: "話して、作ろう。自分だけのまち。",
		url: "https://buildcha.vercel.app/",
		siteName: "BuildCha",
		locale: "ja_JP",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
			>
				<AppWrapper>
					<Header />
					<main>{children}</main>
				</AppWrapper>
			</body>
		</html>
	);
}
