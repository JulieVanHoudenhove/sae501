export function ButtonColor({activeButton, load_customModel, model, name}) {
  return (
    <button
      className={`JeelizVTOWidgetButton button-color ${
        activeButton === `glasses3D/${model}.json` ? "active" : ""
      }`}
      onClick={() => load_customModel(`glasses3D/${model}.json`)}
    >
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSitELPWZe2fuenZ-b1PwGRCbgbhTTFnAw8LvUu15grcvKAWtAXd3HEhGCXwfWNEAxIPgY&usqp=CAU"
          alt=""
        />
        {name}
      </div>
      <span></span>
    </button>
  );
}
