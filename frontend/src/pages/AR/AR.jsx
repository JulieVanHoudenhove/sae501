import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { JEELIZVTOWIDGET } from "jeelizvtowidget";
import "../../styles/AR/AR.css";

import searchImage from "../../assets/target512.jpg";
import { ButtonColor } from "../../components/AR/ButtonColor";

function AR({ glasse }) {
	const refPlaceHolder = useRef();
	const refCanvas = useRef();
	const refAdjustEnter = useRef();
	const refAdjust = useRef();
	const refChangeModel = useRef();
	const refLoading = useRef();
	const navigate = useNavigate();
	const [activeButton, setActiveButton] = useState(null);

	function init_VTOWidget(placeHolder, canvas, toggle_loading, glassesModel) {
		JEELIZVTOWIDGET.start({
			placeHolder,
			canvas,
			callbacks: {
				ADJUST_START: null,
				ADJUST_END: null,
				LOADING_START: toggle_loading.bind(null, true),
				LOADING_END: toggle_loading.bind(null, false),
			},
			sku: "empty", // SKU loadded at the beginning
			// image displayed when face is not found:
			searchImageMask: searchImage, //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
			searchImageColor: 0xeeeeee, // color of loading (face not found) animation
			searchImageRotationSpeed: -0.001, // negative -> clockwise
			callbackReady: function () {
				console.log("INFO: JEELIZVTOWIDGET is ready :)");

				// Charge le modèle par défaut une fois que JEELIZVTOWIDGET est prêt
				load_customModel(glassesModel);
			},
			onError: function (errorLabel) {
				console.log("ERROR: ", errorLabel);
			},
		});
	}

	const load_customModel = (modelPath) => {
		JEELIZVTOWIDGET.load_modelStandalone(modelPath);
		setActiveButton(modelPath);
	};

	const toggle_loading = (isLoadingVisible) => {
		refLoading.current.style.display = isLoadingVisible ? "block" : "none";
	};

	const enter_adjustMode = () => {
		JEELIZVTOWIDGET.enter_adjustMode();
		refAdjustEnter.current.style.display = "none";
		refAdjust.current.style.display = "block";
		refChangeModel.current.style.display = "none";
		refCanvas.current.style.left = "0px";
	};

	const exit_adjustMode = () => {
		JEELIZVTOWIDGET.exit_adjustMode();
		refAdjustEnter.current.style.display = "block";
		refAdjust.current.style.display = "none";
		refChangeModel.current.style.display = "flex";
		refCanvas.current.style.left = "-20%";
	};

	const set_glassesModel = (sku) => {
		JEELIZVTOWIDGET.load(sku);
	};

	useEffect(() => {
		let glassesModel = null;

		glasse.SubColors.forEach((item) => {
			if (item.isActive) {
				setActiveButton(item.nameJsonModel);
				glassesModel = `glasses-3d/${item.nameJsonModel}.json`;
			}
		});

		console.log("active glasses are:", glassesModel);

		if (glassesModel) {
			const placeHolder = refPlaceHolder.current;
			const canvas = refCanvas.current;

			init_VTOWidget(placeHolder, canvas, toggle_loading, glassesModel);
		}

		return () => {
			JEELIZVTOWIDGET.destroy();
		};
	}, []);

	const toggleMenu = () => {
		refChangeModel.current.classList.toggle("show");
	};

	return (
		<div ref={refPlaceHolder} className="JeelizVTOWidgetContainer">
			<div ref={refAdjust} className="JeelizVTOWidgetAdjustNotice">
				Déplacez les lunettes pour les ajuster.
				<button className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton adjust-button" onClick={exit_adjustMode}>
					Fermer
				</button>
			</div>

			<div ref={refChangeModel} className="JeelizVTOWidgetControls JeelizVTOWidgetChangeModelContainer">
				<div className="selector-section-container">
					<div className="selector-section-container-header">
						<h1>{glasse.info.name}</h1>
					</div>
					<div className="selector-section">
						{/* <h2>Coloris</h2> */}
						{glasse.SubColors.map((item, index) => (
							<ButtonColor key={index} activeButton={activeButton} load_customModel={load_customModel} variant={item} />
						))}
					</div>
					{/* <hr /> */}
				</div>
				<div>
					<div onClick={() => navigate(-1)} className="go-back">
						Revenir à la page de séléction
					</div>
					<div className="selector-footer">
						<p>Vous voulez tester nos lunettes en vraies ? prenez rendez-vous ou venez sur place</p>
						<button className="button-rdv">Prendre rendez-vous</button>
					</div>
				</div>
			</div>

			<div className="JeelizVTOWidget">
				<button className="toggle-responsive" onClick={toggleMenu}>
					Menu
				</button>
				<canvas ref={refCanvas} className="JeelizVTOWidgetCanvas"></canvas>
				<div ref={refAdjustEnter} className="JeelizVTOWidgetControls adjust-button-container">
					<button className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton adjust-button" onClick={enter_adjustMode}>
						<svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.8284 6.34313L16.2426 4.92892L12 0.686279L7.75735 4.92892L9.17156 6.34313L12 3.51471L14.8284 6.34313Z" fill="currentColor"></path>
							<path d="M4.92892 16.2426L6.34313 14.8284L3.51471 12L6.34313 9.17156L4.92892 7.75735L0.686279 12L4.92892 16.2426Z" fill="currentColor"></path>
							<path d="M7.75735 19.0711L12 23.3137L16.2426 19.0711L14.8284 17.6568L12 20.4853L9.17156 17.6568L7.75735 19.0711Z" fill="currentColor"></path>
							<path d="M17.6568 9.17156L20.4853 12L17.6568 14.8284L19.0711 16.2426L23.3137 12L19.0711 7.75735L17.6568 9.17156Z" fill="currentColor"></path>
							<path fillRule="evenodd" clipRule="evenodd" d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="currentColor"></path>
						</svg>
						Ajuster la position
					</button>
				</div>
			</div>

			<div ref={refLoading} className="JeelizVTOWidgetLoading">
				<div className="JeelizVTOWidgetLoadingText">LOADING...</div>
			</div>
		</div>
	);
}

export default AR;
