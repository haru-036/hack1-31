import ObjectCard from "@/components/objectCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CompletePage() {
	const supabase = createClient();
	const { data: quests } = await supabase
		.from("quests")
		.select("*")
		.order("difficulty", { ascending: true })
		.limit(3);

	return (
		<div className="w-full min-h-[calc(100vh-56px)] grid place-items-center bg-neutral-50 py-6">
			<div className="max-w-6xl grid w-full px-18 py-16 rounded-3xl gap-16 bg-blue-50 shadow-lg shadow-black/5">
				<div className="flex flex-row gap-2 items-center justify-between">
					<h2 className="font-bold text-3xl">やったね！おうちができたよ！🎉</h2>
					<Button asChild size={"lg"}>
						<Link href="/">
							<Home />
							ホームに戻る
						</Link>
					</Button>
				</div>
				<div className="flex gap-12">
					<div className="bg-white rounded-xl py-8 px-10 w-fit">
						<Image
							src={"/house.png"}
							alt="house"
							width={260}
							height={260}
							className="object-cover block"
						/>
					</div>

					<div className="flex flex-col gap-8 justify-center items-start flex-1">
						<div className="flex items-center gap-4 w-full">
							<div className="flex gap-2 items-baseline">
								<div className="text-muted-foreground text-sm">レベル</div>
								<div className="font-bold text-3xl">2</div>
							</div>
							<div className="space-y-2 w-full max-w-72">
								<Progress value={50} className="mt-6" />
								<p className="text-muted-foreground text-xs">
									あと2個つくればレベルアップ！
								</p>
							</div>
						</div>
						<div className="flex gap-2 items-baseline">
							<div className="text-muted-foreground text-sm">作った数</div>
							<div className="font-bold text-3xl">4</div>
						</div>
					</div>
				</div>

				<div className="grid gap-4">
					<h3 className="font-bold text-2xl">次はどれをつくる？</h3>
					<div className="grid grid-cols-3 gap-4">
						{quests?.map((quest) => (
							<ObjectCard
								key={quest.id}
								name={quest.name}
								difficulty={quest.difficulty}
								masu={quest.masu}
								possible
								image={quest.image_url}
								id={quest.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
