import React from "react";
import { Link } from "react-router-dom";

function FooterComponent() {
	return (
		<footer>
			<nav>
				<img src="/images/logo_rl.png" alt="Logo Roy Lunetier" />

				<ul>
					<li>
						<Link to="/">Démo Live</Link>
					</li>
					<li>
						<Link to="https://mmi21f15.mmi-troyes.fr/sae501/presentation/">Présentation</Link>
					</li>
					<li>
						<Link to="https://mmi21f15.mmi-troyes.fr/sae501/kickstarter/">Kickstarter</Link>
					</li>
				</ul>

				<Link to="https://www.instagram.com/roylunetier/" target="_blank">
					Mentions légales
				</Link>
			</nav>

			<div>
				<p>© 2023 Roy lunetier | Tous droits réservés</p>
			</div>
		</footer>
	);
}

export default FooterComponent;
