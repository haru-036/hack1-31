"use client";
import { createObjectParts } from "@/app/actions";
import { useObjectStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useContext, useTransition } from "react";
import { UserIdContext } from "./appWrapper";
import { Button } from "./ui/button";

export default function CreatedButton() {
	const userId = useContext(UserIdContext);
	const data = useObjectStore((state) => state.objectData);
	const router = useRouter();
	const { questId } = useParams();
	const [isPending, startTransition] = useTransition();
	if (!userId || !questId) return null;

	const handleClick = () => {
		startTransition(async () => {
			if (!data) return;
			await createObjectParts(
				userId,
				questId.toString(),
				data.BuildingPartData,
			);
			router.push(`/${questId}/set`);
		});
	};

	return (
		<Button
			className="w-fit font-bold"
			size={"lg"}
			onClick={handleClick}
			disabled={isPending || !data}
		>
			置く場所を決める
		</Button>
	);
}
