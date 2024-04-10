import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import rotateIcon from "../assets/svg/rotate-icon.svg";
import expandIcon from "../assets/svg/expand-icon.svg";

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
	const [autoRotate, setAutoRotate] = useState(true);

	const toggleAutoRotate = () => setAutoRotate(!autoRotate);

	return (
		<>
			<Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
				<color attach="background" args={["#f0f0f0"]} />

				<ambientLight intensity={10} />

				<Glasses position={[-0.2, 0.4, 1]} rotation={[0, -0.5, 0]} scale={1} currentModelPath={currentModelPath} />

				<Environment preset="city" />
				<OrbitControls target={[0, 0, 0.5]} makeDefault autoRotate={autoRotate} autoRotateSpeed={0.5} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

				<ContactShadows rotation={[0, 0, 0]} position={[0, 0, 0]} opacity={1} width={1} height={1} blur={1.2} far={1} />
			</Canvas>

			<div className="actions-container">
				<div className={"action-rotate action-item" + (autoRotate ? " active" : "")} onClick={toggleAutoRotate}>
					<img src={rotateIcon} alt="rotate" />
				</div>
			</div>
		</>
	);
}
