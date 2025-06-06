"use server";

import { createClient } from "@/lib/supabase/client";
import type { BuildingPartData } from "./[questId]/r3fCanvas";

const supabase = createClient();

export async function createUser(userId: string) {
	const { data, error } = await supabase.from("users").insert({
		id: userId,
	});

	if (error) {
		console.error(error);
		return null;
	}

	return data;
}

export async function createObject(
	userId: string,
	data: {
		type: string;
		name?: string;
		color?: string;
		size?: number[];
		position?: number[];
		emoji?: string;
		description?: string;
	},
) {
	const { error } = await supabase.from("objects").insert({
		user_id: userId,
		...data,
	});

	if (error) {
		throw new Error(error.message);
	}
}

export async function createObjectParts(
	userId: string,
	questId: string,
	data: BuildingPartData,
) {
	const { data: object } = await supabase
		.from("complex_objects")
		.select("*")
		.eq("user_id", userId)
		.eq("quest_id", questId)
		.single();

	if (object) {
		const { error } = await supabase
			.from("complex_objects")
			.update({
				user_id: userId,
				quest_id: questId,
				...data,
			})
			.eq("user_id", userId)
			.eq("quest_id", questId);

		if (error) {
			throw new Error(error.message);
		}

		return;
	}

	const { error } = await supabase.from("complex_objects").insert({
		user_id: userId,
		quest_id: questId,
		...data,
	});

	if (error) {
		throw new Error(error.message);
	}
	console.log("オブジェクト作成完了");
}

export async function updateObjectParts(
	userId: string,
	questId: string,
	position: [number, number, number],
) {
	const { error } = await supabase
		.from("complex_objects")
		.update({
			position,
		})
		.eq("user_id", userId)
		.eq("quest_id", questId);

	if (error) {
		throw new Error(error.message);
	}
	console.log("オブジェクト更新完了");
}
