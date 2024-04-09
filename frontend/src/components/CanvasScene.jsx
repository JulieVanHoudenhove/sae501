import { useGLTF, Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Glasses({ currentModelPath, ...props }) {
	const groupRef = useRef();
	const { scene } = useThree();

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

	useFrame(() => {
		// Rotate the glasses
	});

	return <group ref={groupRef} {...props}></group>;
}

export default function App({ currentModelPath }) {
	return (
		<Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
			<color attach="background" args={["#f0f0f0"]} />

			<ambientLight intensity={0.5} />

			<Glasses position={[-0.1, -0.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.3} currentModelPath={currentModelPath} />

			<Environment preset="city" />
			<OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
		</Canvas>
	);
}
