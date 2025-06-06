import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export const DifficultyBadge = ({
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
	id,
}: {
	name: string;
	difficulty: "easy" | "normal" | "hard";
	image?: string;
	masu: number;
	possible?: boolean;
	className?: string;
	id: string;
}) {
	return (
		<Link
			className={cn(
				"bg-white rounded-2xl p-2.5 h-fit relative transition-shadow",
				possible
					? " hover:cursor-pointer hover:outline-4 hover:outline-primary/50 hover:scale-105 transition-all"
					: "shadow-none",
				className,
			)}
			href={possible ? `/${id}` : "/"}
		>
			{!possible && (
				<div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
					<div className="text-white font-bold">レベルが足りないよ</div>
				</div>
			)}
			<div className="flex items-center justify-between gap-2">
				<DifficultyBadge difficulty={difficulty} />
				{/* <p className="text-xs font-bold">{masu}マス</p> */}
			</div>
			<div className="w-full pt-3">
				<Image
					src={image || "/house.png"}
					alt="house"
					className="object-cover mx-auto"
					width={84}
					height={84}
				/>
			</div>
			<div className="flex items-center gap-2 py-2 px-1 text-base font-bold text-muted-foreground">
				{name} <ChevronRight className="size-6" />
			</div>
		</Link>
	);
}
