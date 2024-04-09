import React, { useState, useEffect } from "react";
import ProductCardComponent from "../components/ProductCard";

function HomePage() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getAllProducts = async () => {
		try {
			const response = await fetch(`http://localhost:3000/products`);

			if (!response.ok) {
				throw new Error(`HTTP error: Status ${response.status}`);
			}

			let data = await response.json();
			setData(data);
			setError(null);
		} catch (err) {
			setError(err.message);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<main id="home-page">
			<span className="breadcrumb">Collection</span>
			<h1>Tous nos modèles</h1>

			<section className="products-container">
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}
				{data && data.map((product) => <ProductCardComponent key={product.id} product={product} />)}
			</section>
		</main>
	);
}

export default HomePage;
