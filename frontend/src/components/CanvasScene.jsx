import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Glasses({ currentModelPath, ...props }) {
	const groupRef = useRef();

	useEffect(() => {
		if (currentModelPath) {
			const loader = new GLTFLoader();

			loader.load("/3d-viewer-models/" + currentModelPath, (gltf) => {
				while (groupRef.current.children.length) {
					groupRef.current.remove(groupRef.current.children[0]);
				}

				groupRef.current.add(gltf.scene);
			});
		}

		return () => {
			while (groupRef.current && groupRef.current.children.length) {
				groupRef.current.remove(groupRef.current.children[0]);
			}
		};
	}, [currentModelPath]);

	return <group ref={groupRef} {...props}></group>;
}

export default function App({ currentModelPath }) {
	return (
		<Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
			<color attach="background" args={["#f0f0f0"]} />

			<ambientLight intensity={10} />

			<Glasses position={[-0.2, 0.4, 1]} rotation={[0, -0.5, 0]} scale={1} currentModelPath={currentModelPath} />

			<Environment preset="city" />
			<OrbitControls makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

			<ContactShadows rotation={[0, 0, 0]} position={[0, 0, 0]} opacity={1} width={1} height={1} blur={1.2} far={1} />
		</Canvas>
	);
}