import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import { CallAR } from "./pages/AR/CallAR";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/products/ListProduct";
import NewProduct from "./pages/admin/products/NewProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import ListVariant from "./pages/admin/variants/ListVariant";
import NewVariant from "./pages/admin/variants/NewVariant";
import EditVariant from "./pages/admin/variants/EditVariant";
import Login from "./pages/admin/Login";
import ListCategory from "./pages/admin/categories/ListCategory";
import NewCategory from "./pages/admin/categories/NewCategory";
import EditCategory from "./pages/admin/categories/EditCategory";
import ListVariantImage from "./pages/admin/variant-images/ListVariantImage.jsx";
import NewVariantImage from "./pages/admin/variant-images/NewVariantImage.jsx";
import EditVariantImage from "./pages/admin/variant-images/EditVariantImage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/product/:id" element={<Product />} />
				</Route>
                <Route path="/ar" element={<CallAR />} />
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="login" element={<Login />} />
					<Route path="categories">
						<Route index element={<ListCategory />} />
						<Route path="new" element={<NewCategory />} />
						<Route path=":id/edit" element={<EditCategory />} />

						<Route path=":id/products">
							<Route index element={<ListProduct />} />
							<Route path="new" element={<NewProduct />} />
							<Route path=":productId/edit" element={<EditProduct />} />

							<Route path=":productId/variants">
								<Route index element={<ListVariant />} />
								<Route path="new" element={<NewVariant />} />
								<Route path=":variantId/edit" element={<EditVariant />} />

								<Route path=":variantId/images">
									<Route index element={<ListVariantImage />} />
									<Route path="new" element={<NewVariantImage />} />
									<Route path=":variantImageId/edit" element={<EditVariantImage />} />
								</Route>
							</Route>
						</Route>
					</Route>

				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
