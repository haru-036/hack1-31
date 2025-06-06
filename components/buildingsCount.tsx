"use client";

import { createClient } from "@/lib/supabase/client";
import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "./appWrapper";

export default function BuildingsCount() {
	const userId = useContext(UserIdContext);
	const [level, setLevel] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			if (userId) {
				const supabase = createClient();
				const { count, error } = await supabase
					.from("complex_objects")
					.select("*", { count: "exact", head: true })
					.eq("user_id", userId);

				if (error) {
					console.error(error);
					return;
				}

				setLevel(count || 0);
			}
		};
		fetchData();
	}, [userId]);

	return (
		<>
			<div className="flex gap-2 items-baseline">
				<div className="text-black/60 text-xs tracking-tight">レベル</div>
				<div className="font-bold text-2xl">{level}</div>
			</div>
			<div className="flex gap-2 items-baseline">
				<div className="text-black/60 text-xs tracking-tight">作った数</div>
				<div className="font-bold text-2xl">{level}</div>
			</div>
		</>
	);
}
