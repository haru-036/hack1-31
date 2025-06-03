"use client";
import { Building } from "@/app/create/r3fCanvas";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

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

export default function Town({ setMode }: { setMode?: boolean }) {
	return (
		<Canvas
			className="w-full h-full grow rounded-2xl"
			camera={{ position: [-6, 6, 10] }}
			shadows
		>
			<ambientLight intensity={1.6} />
			<directionalLight position={[5, 10, 5]} intensity={2} castShadow />

			<GroundGrid setMode={setMode} />

			<fog attach="fog" args={["#fff", 10, 100]} />

			<Building
				size={[1, 1, 1]}
				color={"hotpink"}
				emoji={"🏠"}
				position={[0, 0.5, 0]}
			/>
			<Building
				size={[1, 2, 1]}
				color={"lightblue"}
				emoji={"🏢"}
				position={[-2, 1, 0]}
			/>
			<Building
				size={[1, 2, 1]}
				color={"lightblue"}
				emoji={"🏢"}
				position={[-3, 1, 0]}
			/>

			<OrbitControls />
		</Canvas>
	);
}

function GroundGrid({
	size = 10,
	setMode,
}: { size?: number; setMode?: boolean }) {
	const cells = [];
	const ownedLand = LAND_EXPANSION[4];
	const [hover, setHover] = useState<[number, number] | null>(null);
	const [selected, setSelected] = useState<[number, number] | null>(null);

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
						if (setMode) {
							setSelected([x, z]);
						}
					}}
				>
					<planeGeometry args={[0.98, 0.98]} />
					<meshLambertMaterial
						color={
							ownedLand.some(
								([lx, lz]) => lx === x - size / 2 && lz === z - size / 2,
							)
								? selected?.[0] === x && selected?.[1] === z && setMode
									? "#3C82F6"
									: hover?.[0] === x && hover?.[1] === z && setMode
										? "#AEE882"
										: "#8FBC8F"
								: "#f8d19f"
						}
					/>
				</mesh>,
			);
		}
	}
	return <>{cells}</>;
}
