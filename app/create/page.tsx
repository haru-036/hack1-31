import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
					<div className="bg-white rounded-xl py-6 px-6 row-span-2 flex flex-col">
						<h3 className="font-bold text-xl">チャット</h3>
						<div className="grow flex flex-col justify-end py-5 gap-6">
							<div className="flex items-center gap-4 max-w-2/3">
								<Image
									src={"/AICharacter.png"}
									alt="AICharacter"
									width={66}
									height={66}
								/>
								<div>家をつくってみよう！ どんな形にしたい？</div>
							</div>
							<div className="bg-neutral-100 p-2.5 rounded-md w-fit self-end max-w-2/3">
								壁が青くて、屋根が紫色の家
							</div>
						</div>

						<div className="relative">
							<Textarea
								placeholder="おおきい おしろみたいな いえ"
								className="bg-neutral-100 border-none p-6 resize-none rounded-xl pr-16"
							/>
							<Button
								size={"icon"}
								className="size-10 text-white rounded-full absolute right-4 top-1/2 -translate-y-1/2"
							>
								<ArrowUp className="size-6" />
							</Button>
						</div>
					</div>
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
