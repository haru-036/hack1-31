"use client";
import { useObjectStore } from "@/lib/store";

export default function Name() {
	const data = useObjectStore((state) => state.objectData);

	return (
		<h2 className="font-bold text-3xl">
			やったね！{data?.BuildingPartData.name || "建物"}ができたよ！🎉
		</h2>
	);
}
