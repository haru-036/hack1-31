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
	metadataBase: new URL("https://buildcha.vercel.app"),
	title: "BuildCha",
	description: "話して、作ろう。自分だけのまち。",
	openGraph: {
		title: "BuildCha",
		description: "話して、作ろう。自分だけのまち。",
		url: "https://buildcha.vercel.app/",
		siteName: "BuildCha",
		locale: "ja_JP",
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "BuildCha",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "BuildCha",
		description: "話して、作ろう。自分だけのまち。",
		images: ["/opengraph-image.png"],
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
