import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import { CallAR } from "./pages/AR/CallAR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
        <Route path="/ar" element={<CallAR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
