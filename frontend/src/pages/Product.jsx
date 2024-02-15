import { useParams } from "react-router-dom";
import ProductVariantComponent from "../components/ProductVariant";

const ProductPage = () => {
	const { id } = useParams();

	return (
		<main className="product-page">
			<span className="breadcrumb">
				Collection / Acétate /{" "}
				<a href="#" className="link-secondary">
					Anne
				</a>
			</span>

			<section className="configurator">
				{/* Canvas */}
				<div className="preview-container">
					<div className="canvas"></div>
					<div className="images-container">
						<div className="image"></div>
						<div className="image"></div>
					</div>
				</div>

				{/* Configurator */}
				<div className="product">
					<span>Acétate</span>
					<h1>Anne</h1>

					<div className="product-variants">
						<ProductVariantComponent textureImage={null} textureName="Anne 101" current={true} />
						<ProductVariantComponent textureImage={null} textureName="Anne 102" />
						<ProductVariantComponent textureImage={null} textureName="Anne 103" />
					</div>

					<button className="btn-main">Essayer les lunettes</button>
					<a href="#" className="link-main">
						Comparer avec d'autres lunettes
					</a>
				</div>
			</section>

			<section className="product-details">
				<h2>Découvrez Anne</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</section>
		</main>
	);
};

export default ProductPage;
