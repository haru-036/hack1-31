"use client";
import { Building } from "@/app/create/r3fCanvas";
import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Town() {
	return (
		<Canvas
			className="w-full h-full grow rounded-2xl"
			camera={{ position: [-6, 6, 10] }}
			shadows
		>
			<ambientLight intensity={1.6} />
			<directionalLight position={[5, 10, 5]} intensity={2} castShadow />

			<GroundGrid />
			<fog attach="fog" args={["#000", 10, 100]} />

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
				position={[-3.2, 1, 0]}
			/>

			<mesh position={[2, 0.5, 1]} castShadow>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="red" />
			</mesh>

			<OrbitControls />
		</Canvas>
	);
}

function GroundGrid({ size = 10 }) {
	const cells = [];
	for (let x = 0; x < size; x++) {
		for (let z = 0; z < size; z++) {
			cells.push(
				<mesh
					key={`${x}-${z}`}
					position={[x - size / 2, 0, z - size / 2]}
					rotation={[Math.PI / -2, 0, 0]}
					receiveShadow
				>
					<planeGeometry args={[1, 1]} />
					<meshLambertMaterial color={"#C08150"} />
				</mesh>,
			);
		}
	}
	return <>{cells}</>;
}
