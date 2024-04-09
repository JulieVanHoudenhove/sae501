import React from "react";

function ProductVariantComponent({ textureImage, textureName, current = false }) {
	return (
		<div className={"texture-variant" + (current ? " current" : "")}>
			{textureImage ? <img src={"http://localhost:3000" + textureImage} alt={textureName} /> : <div className="no-image"></div>}

			<p>{textureName}</p>
		</div>
	);
}

export default ProductVariantComponent;
