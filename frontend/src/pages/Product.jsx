import { Link, useParams, useLocation } from "react-router-dom";
import ProductVariantComponent from "../components/ProductVariant";
import CanvasScene from "../components/CanvasScene";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
	const { id } = useParams();
	const { state: product } = useLocation();
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [variant, setVariant] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [activeVariantId, setActiveVariantId] = useState(null);
	const [activeModelId, setActiveModelId] = useState(null);

	const handleVariantClick = (id) => {
		if (activeVariantId === id) return;

		setActiveVariantId(id);

		const activeModel = "model-" + data.id + "/variant-" + id + ".glb";
		console.log(activeModel);

		setActiveModelId(activeModel);
	};

	const getVariants = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/variants/product/${id}`);

			if (!response.ok) {
				throw new Error(`HTTP error: Status ${response.status}`);
			}

			let data = await response.json();
			setVariant(data);
			setError(null);
		} catch (err) {
			setError(err.message);
			setVariant(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!product) {
			navigate("/");
		}

		setData(product.product);
		getVariants(id);
	}, [product]);

	useEffect(() => {
		if (data && variant) {
			handleVariantClick(variant[0].id);
		}
	}, [data, variant]);

	return (
		<main className="product-page">
			{data && (
				<>
					<span className="breadcrumb">
						<a href="/" className="color-gray">
							Collection
						</a>{" "}
						/ Acétate / {data.name}
					</span>

					<section className="configurator">
						{/* Canvas */}
						<div className="preview-container">
							<CanvasScene currentModelPath={activeModelId} />

							{/* <div className="images-container">
								<div className="image"></div>
								<div className="image"></div>
							</div> */}
						</div>

						{/* Configurator */}
						<div className="product">
							<span>{data.category.name}</span>
							<h1>{data.name}</h1>

							<div className="product-variants">
								{loading && <p>Loading...</p>}
								{error && <p>{error}</p>}
								{variant && variant.map((v) => <ProductVariantComponent key={v.id} textureImage={v.textureImage} textureName={v.name} onClick={() => handleVariantClick(v.id)} isActive={activeVariantId === v.id} />)}
							</div>

							<Link to="/ar" state={{ id: activeModelId, defaultGlasses: "glasses3", product: data, variants: variant }} className="btn-main">
								Essayer les lunettes
							</Link>
							<a href="#" className="link-main">
								Comparer avec d'autres lunettes
							</a>
						</div>
					</section>

					<section className="product-details">
						<h2>Découvrez {data.name}</h2>
						<p>{data.description ? data.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
					</section>
				</>
			)}
		</main>
	);
};

export default ProductPage;
