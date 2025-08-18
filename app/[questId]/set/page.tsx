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
		<div className="bg-neutral-100 min-h-svh flex flex-col">
			<div className="xl:container max-w-7xl mx-auto px-10 py-8 w-full h-full grow flex flex-col">
				<div className="flex items-center gap-2">
					<Button
						variant={"ghost"}
						size={"sm"}
						asChild
						className="w-fit text-sm font-normal hover:bg-primary/5"
					>
						<Link href="/">
							<ChevronLeft className="size-4" />
							作るにもどる
						</Link>
					</Button>
				</div>

				<div className="pt-4 h-full grow flex flex-col">
					<div className="w-full h-full bg-white rounded-2xl py-7 px-7 grid grow">
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
