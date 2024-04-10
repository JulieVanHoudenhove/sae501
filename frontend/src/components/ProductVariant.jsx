import React from "react";

function ProductVariantComponent({ textureImage, textureName, onClick, isActive }) {
	return (
		<div className={"texture-variant" + (isActive ? " current" : "")} onClick={onClick}>
			{textureImage ? <img src={"http://localhost:3000" + textureImage} alt={textureName} /> : <div className="no-image"></div>}

			<p>{textureName}</p>
		</div>
	);
}

export default ProductVariantComponent;
