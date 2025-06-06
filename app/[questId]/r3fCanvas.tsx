"use client";
import { UserIdContext } from "@/components/appWrapper";
import { useObjectStore } from "@/lib/store";
import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useParams } from "next/navigation";
import { useContext, useMemo } from "react";
import * as THREE from "three";

export type Data = {
	type: string;
	name: string;
	emoji: string;
	color: string;
	size: [number, number, number];
	description: string;
};

export type BuildingPartData = {
	id?: string;
	chat?: string;
	name?: string;
	parts: {
		type: string;
		position: [number, number, number];
		rotation?: [number, number, number];
		color: string;
		size: [number, number, number];
	}[];
	position?: [number, number, number];
};

const TriangleWall = ({ size }: { size: [number, number, number] }) => {
	const [width, height, depth = 0.1] = size;
	const triangleShape = new THREE.Shape();
	triangleShape.moveTo(-width / 2, 0);
	triangleShape.lineTo(width / 2, 0);
	triangleShape.lineTo(0, height);
	triangleShape.lineTo(-width / 2, 0);

	const extrudeSettings = {
		depth: depth,
		bevelEnabled: false,
	};
	return <extrudeGeometry args={[triangleShape, extrudeSettings]} />;
};

// 建物パーツのレンダリング
function BuildingPart({
	size,
	position,
	rotation,
	color,
	type,
}: BuildingPartData["parts"][number]) {
	let geometry: THREE.BufferGeometry | null = null;

	if (type === "triangleWall") {
		const [width, height] = size;
		// 三角形の形状を作成
		const triangleShape = new THREE.Shape();
		triangleShape.moveTo(-width / 2, 0); // 左下
		triangleShape.lineTo(width / 2, 0); // 右下
		triangleShape.lineTo(0, height); // 上の頂点
		triangleShape.lineTo(-width / 2, 0); // 左下に戻る

		geometry = new THREE.ShapeGeometry(triangleShape);
	}
	return (
		<mesh position={position} rotation={rotation}>
			{geometry ? <TriangleWall size={size} /> : <boxGeometry args={size} />}

			<meshLambertMaterial color={color || "#8B4513"} />
		</mesh>
	);
}

// 建物コンポーネント
export function Buildings({
	buildingData,
}: {
	buildingData: BuildingPartData;
}) {
	return (
		<group>
			{buildingData.parts.map((part, i) => (
				<BuildingPart
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					type={part.type}
					position={part.position}
					rotation={part.rotation}
					color={part.color}
					size={part.size}
				/>
			))}
		</group>
	);
}
// const mock: BuildingPartData = data;

export default function R3fCanvas() {
	const data = useObjectStore((state) => state.objectData);
	const userId = useContext(UserIdContext);
	const { questId } = useParams<{ questId: string }>();
	const setObjectData = useObjectStore((state) => state.setObjectData);

	if (!userId) return null;

	const Object3D = useMemo(() => {
		if (!data || !data.BuildingPartData || data.questId !== questId) {
			setObjectData(null);
			return null;
		}

		// 例: JSON内のオブジェクト定義を基に描画
		return <Buildings buildingData={data.BuildingPartData} />;
	}, [data, questId, setObjectData]);

	return (
		<>
			{data ? (
				<>
					<Canvas shadows camera={{ position: [10, 8, 10], fov: 50 }}>
						<ambientLight intensity={1.6} />
						<directionalLight position={[5, 10, 5]} intensity={2} castShadow />

						<group position={[0, -2, 0]}>{Object3D}</group>
						<OrbitControls position0={[0, 5, 0]} />
					</Canvas>
				</>
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
