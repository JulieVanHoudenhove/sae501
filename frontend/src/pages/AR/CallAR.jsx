import { useEffect, useState } from "react";
import "../../styles/AR/AR.css";
import AR from "./AR";
import { useLocation } from "react-router-dom";

export function CallAR() {
  const [glasse, setGlasse] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.id);
    console.log(location.state.defaultGlasses);
  }, []);

  useEffect(() => {
    // waiting for axios
    // call api with "location.state.id" to get this return and initialize glasse
    setTimeout(() => {
      setGlasse({
        info: {
          name: "Anne glasses",
          subName: "Acétate",
          price: 150,
        },
        SubColors: [
          {
            name: "Anne 1",
            nameJsonModel: "anne 1",
            iamgeURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSitELPWZe2fuenZ-b1PwGRCbgbhTTFnAw8LvUu15grcvKAWtAXd3HEhGCXwfWNEAxIPgY&usqp=CAU",
          },
          {
            name: "Anne 2",
            nameJsonModel: "anne 2",
            iamgeURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSitELPWZe2fuenZ-b1PwGRCbgbhTTFnAw8LvUu15grcvKAWtAXd3HEhGCXwfWNEAxIPgY&usqp=CAU",
          },
          {
            name: "Anne 3",
            nameJsonModel: "anne 3",
            iamgeURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSitELPWZe2fuenZ-b1PwGRCbgbhTTFnAw8LvUu15grcvKAWtAXd3HEhGCXwfWNEAxIPgY&usqp=CAU",
          },
          {
            name: "Anne 4",
            nameJsonModel: "anne 4",
            iamgeURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSitELPWZe2fuenZ-b1PwGRCbgbhTTFnAw8LvUu15grcvKAWtAXd3HEhGCXwfWNEAxIPgY&usqp=CAU",
          },
        ],
      });
    }, 2000);
  }, []);

  return (
    <>
      {glasse ? (
        <AR glasse={glasse} defaultGlasses={location.state.defaultGlasses} />
      ) : (
        <div className="loading-ar-container red">
          <div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
}
