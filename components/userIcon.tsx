"use client";

import { useContext } from "react";
import { UserIdContext } from "./appWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserIcon() {
	const userId = useContext(UserIdContext);
	return (
		<Avatar className="w-7 h-7">
			<AvatarImage
				src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${userId}`}
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
}
