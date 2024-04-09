import { useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, Caustics, CubeCamera, Environment, OrbitControls, RandomizedLight, AccumulativeShadows, MeshRefractionMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { RGBELoader } from "three-stdlib";

function Diamond(props) {
	const ref = useRef();
	const glasses = useGLTF("/model_2.glb");

	return <primitive object={glasses.scene} ref={ref} scale={[0.5, 0.5, 0.5]} castShadow receiveShadow {...props} />;
}

export default function App() {
	return (
		<Canvas shadows shadowMap camera={{ position: [-5, 0.5, 5], fov: 45 }}>
			<color attach="background" args={["#f0f0f0"]} />

			<ambientLight intensity={4 * Math.PI} />
			{/* <spotLight decay={0} position={[5, 5, -10]} angle={0.15} penumbra={1} castShadow /> */}
			{/* <pointLight decay={0} position={[-10, -10, -10]} /> */}

			<Diamond rotation={[0, 0, 0]} position={[0, -0.175 + 0.5, 0]} />

			<AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.7} opacity={1} scale={12} position={[0, -0.5, 0]}>
				<RandomizedLight amount={8} radius={10} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
			</AccumulativeShadows>

			<OrbitControls makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

			<EffectComposer>
				<Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
			</EffectComposer>
		</Canvas>
	);
}
