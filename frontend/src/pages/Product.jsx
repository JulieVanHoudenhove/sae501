import { useParams } from "react-router-dom";

const ProductPage = () => {
	const { id } = useParams();
	console.log(id);

	return <div>Product {id}</div>;
};

export default ProductPage;
