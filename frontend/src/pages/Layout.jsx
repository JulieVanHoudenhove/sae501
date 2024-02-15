import "../styles/main.css";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/oeil_roy_lunetier.svg";

const Layout = () => {
	return (
		<>
			{/* NAVBAR */}

			<Outlet />
		</>
	);
};

export default Layout;
