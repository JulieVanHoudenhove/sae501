import { useEffect, useState } from "react";
import "../../styles/AR/AR.css";
import AR from "./AR";
import { useLocation } from "react-router-dom";

export function CallAR() {
	const location = useLocation();
	const [glasse, setGlasse] = useState(null);

	const createSubColors = (variants) => {
		let subColors = [];
		variants.forEach((variant) => {
			subColors.push({
				name: variant.name,
				nameJsonModel: "/glasses-3d/" + location.state.product.id + "/variant-" + variant.id + ".glb",
				iamgeURL: "http://localhost:3000" + variant.textureImage,
			});
		});
		return subColors;
	};

	useEffect(() => {
		if (!location.state || !location.state.product || !location.state.variants) {
			console.log("No product or variants found in location state");
			return;
		}

		console.log(location.state);

		const subColors = createSubColors(location.state.variants);

		setGlasse({
			info: {
				name: location.state.product.name,
				subName: location.state.product.category.name,
				price: 150,
			},
			SubColors: subColors,
		});
	}, [location.state]);

	return (
		<>
			{glasse ? (
				<AR glasse={glasse} defaultGlasses={location.state.defaultGlasses} />
			) : (
				<div className="loading-ar-container red">
					<div>
						<div className="h-20"></div>
						<div className="h-20"></div>
						<div className="h-20"></div>
						<div className="h-20"></div>
						<div className="h-20"></div>
					</div>
					<div></div>
				</div>
			)}
		</>
	);
}
