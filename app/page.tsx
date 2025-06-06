import BuildingsCount from "@/components/buildingsCount";
import ObjectCard from "@/components/objectCard";
import Town from "@/components/town";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default async function Home() {
	const supabase = createClient();
	const { data: quests } = await supabase
		.from("quests")
		.select("*")
		.order("difficulty", { ascending: true });

	return (
		<div className="bg-[#F7F5FF] min-h-[calc(100vh-56px)] grid">
			<div className="w-full mx-auto px-10 py-9 h-full grow flex gap-9">
				<div className="w-full h-full bg-neutral-200 rounded-2xl grow grid relative flex-2/3">
					<div className="absolute top-6 left-5 grid gap-6 z-20">
						<div className="bg-white rounded-md px-5 py-2 flex gap-3  w-fit">
							<BuildingsCount />
						</div>

						<div className="flex items-center gap-4">
							<Image
								src={"/AICharacter.png"}
								alt="AICharacter"
								width={66}
								height={66}
							/>
							<div className="bg-white rounded-md p-2.5 leading-tight">
								わからないことがあれば
								<br />
								なんでも聞いてね！
							</div>
						</div>
					</div>
					<Town />
				</div>
				<div className="w-full flex-1/3">
					<h2 className="text-2xl font-bold">最初におすすめ</h2>
					<div className="w-full grid gap-6 grid-cols-2 py-4">
						{quests?.map((quest) => (
							<ObjectCard
								key={quest.id}
								id={quest.id}
								name={quest.name}
								difficulty={quest.difficulty}
								masu={quest.masu}
								possible={
									quest.difficulty === "easy" || quest.difficulty === "normal"
								}
								image={quest.image_url}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
