import "../styles/main.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/Footer";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<FooterComponent />
		</>
	);
};

export default Layout;
