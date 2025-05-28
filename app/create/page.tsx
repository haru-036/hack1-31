import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Chat from "./chat";

export default function Create() {
	return (
		<div className="bg-neutral-100 min-h-[calc(100vh-52px)] flex flex-col">
			<div className="max-w-7xl mx-auto px-10 py-10 w-full h-full grow flex flex-col">
				<div className="flex items-center gap-2">
					<Button variant={"ghost"} size={"icon"} asChild>
						<Link href="/">
							<ChevronLeft className="size-6" />
						</Link>
					</Button>
					<h2 className="text-3xl font-bold">作る</h2>
				</div>

				<div className="pt-6 grid grid-cols-2 grid-rows-2 gap-x-11 gap-y-8 grow">
					<Chat />
					<div className="bg-white rounded-xl py-6 px-6">
						<h3 className="font-bold text-xl">お手本</h3>
					</div>
					<div className="bg-white rounded-xl py-6 px-6 flex flex-col">
						<h3 className="font-bold text-xl">結果</h3>
						<p className="text-muted-foreground text-center grow grid items-center">
							プロンプトを入力すると表示されます
						</p>
						<Button className="w-fit self-end font-bold">できた！</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
