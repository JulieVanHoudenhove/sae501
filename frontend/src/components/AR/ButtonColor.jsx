export function ButtonColor({ activeButton, load_customModel, variant }) {
	return (
		<button className={`JeelizVTOWidgetButton button-color ${activeButton === `glasses-3d/${variant.nameJsonModel}.json` ? "active" : ""}`} onClick={() => load_customModel(`glasses-3d/${variant.nameJsonModel}.json`)}>
			<div>
				<img src={variant.iamgeURL} alt="" />
				{variant.name}
			</div>
			<span></span>
		</button>
	);
}
