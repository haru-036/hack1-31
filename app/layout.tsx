import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppWrapper from "@/components/appWrapper";

const LINESeedJP = localFont({
	src: [
		{
			path: "../fonts/LINESeedJP_OTF_Th.woff2",
			weight: "200",
			style: "thin",
		},
		{
			path: "../fonts/LINESeedJP_OTF_Rg.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/LINESeedJP_OTF_Bd.woff2",
			weight: "700",
			style: "bold",
		},
		{
			path: "../fonts/LINESeedJP_OTF_Eb.woff2",
			weight: "900",
			style: "extrabold",
		},
	],
	display: "swap",
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
			<body className={`${LINESeedJP.className} antialiased min-h-screen`}>
				<AppWrapper>
					<main>{children}</main>
				</AppWrapper>
			</body>
		</html>
	);
}
