"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useObjectStore } from "@/lib/store";
import type { Content } from "@google/genai";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { create3DChat, getChatHistory } from "./actions";

export default function Chat() {
	const [message, setMessage] = useState("");
	const setObjectData = useObjectStore((state) => state.setObjectData);
	const [isPending, startTransition] = useTransition();
	const [history, setHistory] = useState<Content[]>([]);

	const handleSubmit = async () => {
		if (message.trim() === "") return;
		setHistory([...history, { role: "user", parts: [{ text: message }] }]);
		startTransition(async () => {
			const data = await create3DChat(message);
			console.log(data);
			setObjectData(data);
			const historyData = await getChatHistory();
			setHistory(historyData);
			setMessage("");
		});
	};

	return (
		<>
			<ScrollArea className="h-full overflow-y-auto py-5">
				<div className="grow flex flex-col justify-start gap-6">
					<div className="flex items-center gap-4 max-w-2/3">
						<Image
							src={"/AICharacter.png"}
							alt="AICharacter"
							width={66}
							height={66}
						/>
						<div>家をつくってみよう！ どんな形にしたい？</div>
					</div>

					{history.map((item, index) =>
						item.role === "model" ? (
							<div
								key={`${item.role}-${index}`}
								className="flex items-center gap-4 max-w-2/3"
							>
								<Image
									src={"/AICharacter.png"}
									alt="AICharacter"
									width={66}
									height={66}
								/>
								<div>
									{JSON.parse(item.parts?.[0]?.text ?? "{}").description}
								</div>
							</div>
						) : (
							<div
								key={`${item.role}-${index}`}
								className="bg-neutral-100 py-2.5 px-3 rounded-md w-fit self-end max-w-2/3 whitespace-pre-wrap"
							>
								{item.parts?.[0]?.text ?? ""}
							</div>
						),
					)}
					{isPending && (
						<div className="flex items-center gap-4 max-w-2/3">
							<Image
								src={"/AICharacter.png"}
								alt="AICharacter"
								width={66}
								height={66}
							/>
							<div className="animate-pulse text-muted-foreground">
								がんばって つくっているよ 🔨🏠
							</div>
						</div>
					)}
				</div>
			</ScrollArea>

			<div className="relative">
				<Textarea
					placeholder="おおきい おしろみたいな いえ"
					className="bg-neutral-100 border-none p-6 resize-none rounded-xl pr-16"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					disabled={isPending}
				/>
				<Button
					size={"icon"}
					className="size-10 text-white rounded-full absolute right-4 top-1/2 -translate-y-1/2"
					onClick={handleSubmit}
					disabled={isPending}
				>
					<ArrowUp className="size-6" />
				</Button>
			</div>
		</>
	);
}
