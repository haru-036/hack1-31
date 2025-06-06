"use client";
import { type BuildingPartData, Buildings } from "@/app/[questId]/r3fCanvas";
import { useObjectStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "./appWrapper";

// レベルごとの土地拡張パターン
const LAND_EXPANSION = {
	1: [
		[0, 0], // レベル1: 中央1マス
	],
	2: [
		[0, 0],
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1], // レベル2: 十字形
	],
	3: [
		[0, 0],
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
		[-1, -1],
		[-1, 1],
		[1, -1],
		[1, 1], // レベル3: 3x3
	],
	4: [
		// レベル4: 8x5の長方形
		...Array.from({ length: 8 }, (_, x) =>
			Array.from({ length: 5 }, (_, z) => [x - 4, z - 2]),
		).flat(),
	],
};

async function getObjectParts(
	userId: string,
	questId: string,
): Promise<BuildingPartData | null> {
	const { data, error } = await supabase
		.from("complex_objects")
		.select("*")
		.eq("user_id", userId)
		.eq("quest_id", questId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

async function getMyTown(userId: string): Promise<BuildingPartData[] | null> {
	const { data, error } = await supabase
		.from("complex_objects")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export default function Town({
	setMode,
}: {
	setMode?: boolean;
}) {
	const userId = useContext(UserIdContext);
	const { questId } = useParams();
	const setObjectData = useObjectStore((state) => state.setObjectData);
	const [myTown, setMyTown] = useState<BuildingPartData[] | null>(null);

	const [buildingData, setBuildingData] = useState<BuildingPartData | null>(
		null,
	);
	const [selected, setSelected] = useState<[number, number] | null>(null);

	useEffect(() => {
		if (setMode && userId && questId && getObjectParts) {
			getObjectParts(userId, questId.toString()).then(setBuildingData);
		}
	}, [userId, questId, setMode]);

	useEffect(() => {
		if (userId && getMyTown) {
			getMyTown(userId).then(setMyTown);
		}
	}, [userId]);

	useEffect(() => {
		if (selected && buildingData?.parts) {
			setObjectData({
				parts: buildingData.parts,
				position: [selected[0], 0, selected[1]],
			});
		}
	}, [selected, buildingData, setObjectData]);

	const SIZE = 10;

	return (
		<Canvas
			className="w-full h-full grow rounded-2xl"
			camera={{ position: [-6, 6, 10] }}
			shadows
		>
			<ambientLight intensity={1.6} />
			<directionalLight position={[5, 10, 5]} intensity={2} castShadow />

			<GroundGrid
				setMode={setMode}
				selected={selected}
				setSelected={setSelected}
				size={SIZE}
			/>

			<fog attach="fog" args={["#fff", 10, 100]} />

			{setMode && buildingData && selected && (
				<group
					scale={0.4}
					position={[
						selected?.[0] ? selected[0] - SIZE / 2 + 0.5 : 0,
						0,
						selected?.[1] ? selected[1] - SIZE / 2 + 0.5 : 0,
					]}
				>
					<Buildings buildingData={buildingData} />
				</group>
			)}

			{myTown?.map(
				(building) =>
					building.position && (
						<group
							key={building.id}
							scale={0.4}
							position={[
								building.position[0] - SIZE / 2 + 0.5,
								0,
								building.position[2] - SIZE / 2 + 0.5,
							]}
						>
							<Buildings buildingData={building} />
						</group>
					),
			)}

			<OrbitControls />
		</Canvas>
	);
}

function GroundGrid({
	size = 10,
	setMode,
	selected,
	setSelected,
}: {
	size?: number;
	setMode?: boolean;
	selected: [number, number] | null;
	setSelected: (selected: [number, number] | null) => void;
}) {
	const cells = [];
	// const ownedLand = LAND_EXPANSION[4];
	const [hover, setHover] = useState<[number, number] | null>(null);

	for (let x = 0; x < size; x++) {
		for (let z = 0; z < size; z++) {
			cells.push(
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<mesh
					key={`${x}-${z}`}
					position={[x - size / 2, 0, z - size / 2]}
					rotation={[Math.PI / -2, 0, 0]}
					receiveShadow
					onPointerOver={() => setHover([x, z])}
					onPointerOut={() => setHover(null)}
					onClick={() => {
						if (
							setMode
							// ownedLand.some(
							// 	([lx, lz]) => lx === x - size / 2 && lz === z - size / 2,
							// )
						) {
							setSelected([x, z]);
						}
					}}
				>
					<planeGeometry args={[0.98, 0.98]} />
					<meshLambertMaterial
						color={
							selected?.[0] === x && selected?.[1] === z && setMode
								? "#3C82F6"
								: hover?.[0] === x && hover?.[1] === z && setMode
									? "#AEE882"
									: "#8FBC8F"
						}
					/>
				</mesh>,
			);
		}
	}
	return <>{cells}</>;
}
