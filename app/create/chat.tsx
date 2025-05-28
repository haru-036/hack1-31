import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Chat() {
	return (
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
	);
}
