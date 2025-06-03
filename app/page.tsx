import ObjectCard from "@/components/objectCard";
import Town from "@/components/town";
import Image from "next/image";

export default function Home() {
	return (
		<div className="bg-[#F7F5FF] min-h-[calc(100vh-56px)] grid">
			<div className="w-full mx-auto px-10 py-9 h-full grow flex gap-9">
				<div className="w-full h-full bg-neutral-200 rounded-2xl grow grid relative flex-2/3">
					<div className="absolute top-6 left-5 grid gap-6 z-20">
						<div className="bg-white rounded-md px-5 py-2 flex gap-3  w-fit">
							<div className="flex gap-2 items-baseline">
								<div className="text-black/60 text-xs tracking-tight">
									レベル
								</div>
								<div className="font-bold text-2xl">13</div>
							</div>
							<div className="flex gap-2 items-baseline">
								<div className="text-black/60 text-xs tracking-tight">
									作った数
								</div>
								<div className="font-bold text-2xl">13</div>
							</div>
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
						<ObjectCard name="家" difficulty={"easy"} masu={2} possible />
						<ObjectCard name="アパート" difficulty={"easy"} masu={2} possible />
						<ObjectCard name="公園" difficulty={"easy"} masu={2} possible />
						<ObjectCard
							name="マンション"
							difficulty={"normal"}
							masu={5}
							possible
						/>
						<ObjectCard name="カフェ" difficulty={"hard"} masu={8} possible />
						<ObjectCard name="ホテル" difficulty={"hard"} masu={10} />
						<ObjectCard name="カフェ" difficulty={"hard"} masu={8} />
						<ObjectCard name="ホテル" difficulty={"hard"} masu={10} />
					</div>
				</div>
			</div>
		</div>
	);
}
