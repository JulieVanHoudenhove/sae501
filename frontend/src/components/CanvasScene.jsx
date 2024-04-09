import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, ContactShadows } from "@react-three/drei";

function Glasses(props) {
	const { scene } = useGLTF("/model_2.glb");
	return <primitive object={scene} {...props} />;
}

export default function App() {
	return (
		<Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
			<ambientLight intensity={0.5} />

			<Glasses position={[-0.1, -0.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.3} />

			<Environment preset="city" />
			<OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
		</Canvas>
	);
}
