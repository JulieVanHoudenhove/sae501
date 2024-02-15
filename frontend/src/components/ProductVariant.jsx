import React from "react";

function ProductVariantComponent({ textureImage, textureName, current }) {
	return (
		<div className={"texture-variant" + (current ? " current" : "")}>
			{textureImage ? <img src={"/" + textureImage} alt={textureName} /> : <div className="no-image"></div>}

			<p>{textureName}</p>
		</div>
	);
}

export default ProductVariantComponent;
