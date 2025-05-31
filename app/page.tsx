import Town from "@/components/town";
import Image from "next/image";

export default function Home() {
	return (
		<div className="bg-neutral-100 min-h-[calc(100vh-52px)] flex flex-col">
			<div className="w-full mx-auto px-10 py-9 h-full flex flex-col grow">
				<div className="w-full h-full bg-neutral-300 rounded-2xl grow grid relative">
					<div className="absolute top-6 left-5 grid gap-6 z-20">
						<div className="bg-white rounded-md px-5 py-2 flex gap-3  w-fit">
							<div className="flex gap-2 items-baseline">
								<div className="text-black/50 text-xs tracking-tight">
									レベル
								</div>
								<div className="font-bold text-2xl">13</div>
							</div>
							<div className="flex gap-2 items-baseline">
								<div className="text-black/50 text-xs tracking-tight">
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
			</div>
		</div>
	);
}
