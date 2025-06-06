import Link from "next/link";
import UserIcon from "./userIcon";

export default function Header() {
	return (
		<header className="flex justify-between items-center max-w-7xl lg:container mx-auto px-10 py-3.5">
			<div className="font-black text-lg">
				<Link href="/">BuildCha</Link>
			</div>
			<div className="flex items-center gap-2">
				<UserIcon />
				{/* <p className="text-sm text-neutral-700">田中太郎</p> */}
			</div>
		</header>
	);
}
