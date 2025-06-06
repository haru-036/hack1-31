import Image from "next/image";
import Link from "next/link";
import UserIcon from "./userIcon";

export default function Header() {
	return (
		<header className="flex justify-between items-center max-w-7xl lg:container mx-auto px-10 py-3.5">
			<Link href="/" className="h-7 w-auto block">
				<Image src="/logo.png" alt="logo" width={90} height={28} />
			</Link>
			<div className="flex items-center gap-2">
				<UserIcon />
				{/* <p className="text-sm text-neutral-700">田中太郎</p> */}
			</div>
		</header>
	);
}
