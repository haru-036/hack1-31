import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const DifficultyBadge = ({
	difficulty,
}: { difficulty: "easy" | "normal" | "hard" }) => {
	let label: string;
	switch (difficulty) {
		case "easy":
			label = "かんたん";
			break;
		case "normal":
			label = "ふつう";
			break;
		case "hard":
			label = "むずかしい";
			break;
	}
	return <Badge variant={difficulty}>{label}</Badge>;
};

export default function ObjectCard({
	name,
	difficulty,
	image,
	masu,
	possible,
	className,
}: {
	name: string;
	difficulty: "easy" | "normal" | "hard";
	image?: string;
	masu: number;
	possible?: boolean;
	className?: string;
}) {
	return (
		<div className={cn("bg-white rounded-2xl p-2.5 h-fit relative", className)}>
			{!possible && (
				<div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
					<div className="text-white font-bold">レベルが足りないよ</div>
				</div>
			)}
			<div className="flex items-center justify-between gap-2">
				<DifficultyBadge difficulty={difficulty} />
				<p className="text-xs font-bold">{masu}マス</p>
			</div>
			<div className="w-full pt-3">
				<Image
					src={"/house.png"}
					alt="house"
					className="object-cover mx-auto"
					width={84}
					height={84}
				/>
			</div>
			<div>
				<Button
					asChild
					variant={"ghost"}
					className="text-base font-bold text-muted-foreground"
				>
					<Link href={"/create"}>
						{name} <ChevronRight className="size-6" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
