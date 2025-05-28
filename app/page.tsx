import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-neutral-50 min-h-[calc(100vh-52px)]">
			<div className="max-w-7xl mx-auto px-10 py-4">
				<Button asChild>
					<Link href="/create">作る</Link>
				</Button>
			</div>
		</div>
	);
}
