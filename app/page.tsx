import BuildingsCount from "@/components/buildingsCount";
import Header from "@/components/header";
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
		<>
			<Header />
			<div className="bg-[#F7F5FF] min-h-[calc(100vh-56px)] grid">
				<div className="w-full mx-auto px-4 xl:px-10 py-5 xl:py-9 h-full grow flex gap-1 xl:gap-4">
					<div className="w-full h-full bg-neutral-200 rounded-2xl grow grid relative flex-2/3">
						<div className="absolute top-6 left-5 grid gap-6 z-20">
							<div className="bg-white rounded-md px-5 py-2 flex gap-3  w-fit">
								<BuildingsCount />
							</div>

							<div className="flex items-center gap-3">
								<Image
									src={"/AICharacter.png"}
									alt="AICharacter"
									width={64}
									height={64}
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
					<div className="w-full flex-1/3 overflow-x-auto">
						<h2 className="text-xl xl:text-2xl font-bold px-4">
							最初におすすめ
						</h2>
						<div
							className="grid gap-3 xl:gap-6 px-4 py-2 xl:py-4 grid-cols-1 auto-rows-max overflow-y-auto"
							style={{
								gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
								maxHeight: "calc(100vh - 124px)",
							}}
						>
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
		</>
	);
}
