import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header() {
	return (
		<header className="flex justify-between items-center max-w-7xl lg:container mx-auto px-10 py-3.5">
			<div className="font-black text-lg">
				<Link href="/">BuildCha</Link>
			</div>
			<div className="flex items-center gap-2">
				<Avatar className="w-7 h-7">
					<AvatarImage src="https://api.dicebear.com/9.x/fun-emoji/svg" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				{/* <p className="text-sm text-neutral-700">田中太郎</p> */}
			</div>
		</header>
	);
}
