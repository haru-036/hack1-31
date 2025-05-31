"use client";
import { useObjectStore } from "@/lib/store";
import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

export type Data = {
	type: string;
	name: string;
	emoji: string;
	color: string;
	size: [number, number, number];
	description: string;
};

export default function R3fCanvas() {
	const data = useObjectStore((state) => state.objectData);

	const Object3D = useMemo(() => {
		if (!data) return null;

		// 例: JSON内のオブジェクト定義を基に描画
		return (
			<Building
				size={[data.size[0], data.size[1], data.size[2]]}
				color={data.color}
				emoji={data.emoji}
			/>
		);
	}, [data]);

	return (
		<>
			{data ? (
				<Canvas shadows>
					<ambientLight intensity={1.6} />
					<directionalLight position={[5, 10, 5]} intensity={2} castShadow />

					{Object3D}
					<OrbitControls />
				</Canvas>
			) : (
				<p className="text-muted-foreground text-center grow grid items-center">
					プロンプトを入力すると表示されます
				</p>
			)}
		</>
	);
}

export const Building = ({
	size,
	color,
	emoji,
	position = [0, 0, 0],
}: {
	size: [number, number, number];
	color: string;
	emoji: string;
	position?: [number, number, number];
}) => {
	return (
		<group position={[position[0], position[1] - 0.05, position[2]]}>
			<mesh position={[0, 0, 0]} castShadow receiveShadow>
				<boxGeometry args={[size[0] - 0.1, size[1] - 0.1, size[2] - 0.1]} />
				<meshLambertMaterial color={color} />
			</mesh>
			<Text
				position={[0, 0, size[2] / 2 - 0.04]}
				rotation={[0, 0, 0]}
				fontSize={0.5}
				color="black"
				anchorX="center"
				anchorY="middle"
			>
				{emoji}
			</Text>
		</group>
	);
};
