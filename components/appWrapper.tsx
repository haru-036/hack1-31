"use client";

import { createUser } from "@/app/actions";
import { type ReactNode, createContext, useEffect, useState } from "react";

export const UserIdContext = createContext<string | null>(null);

export default function AppWrapper({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		let uid = localStorage.getItem("anon_user_id");
		if (!uid) {
			uid = crypto.randomUUID();
			localStorage.setItem("anon_user_id", uid);
			createUser(uid);
		}
		setUserId(uid);
	}, []);

	if (!userId) return null; // ローディング中でもいい

	return (
		<UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
	);
}
