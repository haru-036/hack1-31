import CreatedButton from "@/components/createdButton";
import { DifficultyBadge } from "@/components/objectCard";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Chat from "./chat";
import R3fCanvas from "./r3fCanvas";

export default async function Create({
	params,
}: {
	params: Promise<{ questId: string }>;
}) {
	const { questId } = await params;
	const supabase = createClient();
	const { data: quest } = await supabase
		.from("quests")
		.select("*")
		.eq("id", questId)
		.single();

	if (!quest) {
		return <div>Quest not found</div>;
	}

	return (
		<div className="bg-neutral-100 h-[calc(100vh-56px)] flex flex-col">
			<div className="xl:container max-w-7xl mx-auto px-4 xl:px-10 py-4 xl:py-8 w-full h-full grow flex flex-col">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 xl:gap-2">
						<Button variant={"ghost"} size={"icon"} asChild>
							<Link href="/">
								<ChevronLeft className="size-4 xl:size-6" />
							</Link>
						</Button>
						<h2 className="text-xl xl:text-2xl font-bold">{quest.name}</h2>
						<DifficultyBadge difficulty={quest.difficulty} />
					</div>
					<CreatedButton />
				</div>

				<div className="pt-3 xl:pt-6 grid grid-cols-4 xl:grid-cols-5 grid-rows-5 gap-x-6 xl:gap-x-11 gap-y-6 xl:gap-y-8 grow h-[calc(100%-100px)]">
					<div className="bg-white rounded-xl py-4 px-4 xl:py-6 xl:px-6 col-span-2 xl:col-span-3 flex flex-col row-span-5 h-full">
						<h3 className="font-bold text-lg xl:text-xl">チャット</h3>
						{quest.challenge && (
							<div className="w-full p-4 bg-neutral-100 rounded-lg mt-3 text-sm space-y-2.5">
								<h4 className="font-bold">達成条件</h4>
								<p>{quest.challenge}</p>
							</div>
						)}
						<Chat />
					</div>

					<div className="bg-white rounded-xl py-4 xl:py-6 px-4 xl:px-6 flex flex-col gap-1 xl:gap-4 col-span-2 row-span-2">
						<h3 className="font-bold text-lg xl:text-xl">お手本</h3>
						<div className="w-full h-full flex items-center justify-center relative">
							<Image
								src={quest.image_url || "/house.png"}
								alt="お手本"
								fill
								className="object-contain block"
							/>
						</div>
					</div>
					<div className="bg-white rounded-xl py-4 xl:py-6 px-4 xl:px-6 flex flex-col h-full col-span-2 row-span-3">
						<h3 className="font-bold text-lg xl:text-xl">結果</h3>

						<R3fCanvas />
					</div>
				</div>
			</div>
		</div>
	);
}
