import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
	return (
		<header className="flex justify-between items-center max-w-7xl lg:container mx-auto px-10 py-3.5">
			<div className="font-bold">LOGO</div>
			<div className="flex items-center gap-2">
				<Avatar className="w-6 h-6">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<p className="text-sm text-neutral-700">田中太郎</p>
			</div>
		</header>
	);
}
