import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Chat from "./chat";
import R3fCanvas from "./r3fCanvas";

export default async function Create() {
	return (
		<div className="bg-neutral-100 h-[calc(100vh-56px)] flex flex-col">
			<div className="xl:container max-w-7xl mx-auto px-10 py-10 w-full h-full grow flex flex-col">
				<div className="flex items-center gap-2">
					<Button variant={"ghost"} size={"icon"} asChild>
						<Link href="/">
							<ChevronLeft className="size-6" />
						</Link>
					</Button>
					<h2 className="text-3xl font-bold">作る</h2>
				</div>

				<div className="pt-6 grid grid-cols-5 grid-rows-2 gap-x-11 gap-y-8 grow auto-rows-max h-[calc(100%-100px)]">
					<div className="bg-white rounded-xl py-6 px-6 col-span-3 flex flex-col row-span-2 h-full">
						<h3 className="font-bold text-xl">チャット</h3>
						{/* <div className="w-full p-4 bg-neutral-100 rounded-lg mt-3 text-sm space-y-2.5">
							<h4 className="font-bold">達成条件</h4>
							<p>家という単語を使わない</p>
						</div> */}
						<Chat />
					</div>

					<div className="bg-white rounded-xl py-6 px-6 flex flex-col gap-4 col-span-2">
						<h3 className="font-bold text-xl">お手本</h3>
						<div className="w-full h-full flex items-center justify-center">
							<Image
								src="/house.png"
								alt="お手本"
								width={350}
								height={350}
								className="object-cover"
							/>
						</div>
					</div>
					<div className="bg-white rounded-xl py-6 px-6 flex flex-col h-full col-span-2">
						<h3 className="font-bold text-xl">結果</h3>

						<R3fCanvas />

						<Button asChild className="w-fit self-end font-bold">
							<Link href="/create/set">できた！</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
