import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Product from "./pages/Product";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/product/:id" element={<Product />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
