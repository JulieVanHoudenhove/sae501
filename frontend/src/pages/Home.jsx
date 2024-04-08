import React from "react";
import ProductCardComponent from "../components/ProductCard";

function HomePage() {
	const data = [
		{
			id: 1,
			name: "Anne",
			category: "Acétate",
			img: "/images/anne.jpg",
		},
		{
			id: 2,
			name: "Aristide",
			category: "Acétate",
			img: "/images/aristide.jpg",
		},
		{
			id: 3,
			name: "Armelle",
			category: "Acétate",
			img: "/images/armelle.jpg",
		},
		{
			id: 4,
			name: "Anne",
			category: "Acétate",
			img: "/images/anne.jpg",
		},
		{
			id: 5,
			name: "Anne",
			category: "Acétate",
			img: "/images/anne.jpg",
		},
		{
			id: 6,
			name: "Anne",
			category: "Acétate",
			img: "/images/anne.jpg",
		},
	];

	return (
		<main id="home-page">
			<span className="breadcrumb">Collection</span>
			<h1>Tous nos modèles</h1>

			<section className="products-container">
				{data.map((product) => (
					<ProductCardComponent key={product.id} product={product} />
				))}
			</section>
		</main>
	);
}

export default HomePage;
