import SetedButton from "@/components/setedButton";
import Town from "@/components/town";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SetObject({
	params,
}: {
	params: Promise<{ questId: string }>;
}) {
	const { questId } = await params;

	return (
		<div className="bg-neutral-100 h-[calc(100vh-56px)] flex flex-col">
			<div className="xl:container max-w-7xl mx-auto px-10 py-10 w-full h-full grow flex flex-col">
				<div className="flex items-center gap-2">
					<Button variant={"ghost"} size={"icon"} asChild>
						<Link href={`/${questId}`}>
							<ChevronLeft className="size-6" />
						</Link>
					</Button>
					<h2 className="text-3xl font-bold">作る</h2>
				</div>

				<div className="pt-6 h-full">
					<div className="w-full h-full bg-white rounded-xl py-8 px-8 grid">
						<div className="flex items-center gap-5">
							<Image
								src={"/AICharacter.png"}
								alt="AICharacter"
								width={66}
								height={66}
							/>
							<h3 className="text-lg font-bold">
								置く場所を決めよう！どこに置く？
							</h3>
						</div>
						<Town setMode />
						<div className="w-full flex justify-end">
							<SetedButton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
