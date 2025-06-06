"use client";
import { updateObjectParts } from "@/app/actions";
import { useObjectStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useContext, useTransition } from "react";
import { UserIdContext } from "./appWrapper";
import { Button } from "./ui/button";

export default function SetedButton() {
	const userId = useContext(UserIdContext);
	const data = useObjectStore((state) => state.objectData);
	const router = useRouter();
	const { questId } = useParams();
	const [isPending, startTransition] = useTransition();
	if (!userId || !data || !questId) return null;

	const handleClick = () => {
		startTransition(async () => {
			if (!data.BuildingPartData.position) return;
			await updateObjectParts(
				userId,
				questId.toString(),
				data.BuildingPartData.position,
			);
			router.push(`/${questId}/complete`);
		});
	};

	return (
		<Button
			className="w-fit self-end font-bold mt-4"
			onClick={handleClick}
			disabled={isPending}
		>
			決まった！
		</Button>
	);
}
