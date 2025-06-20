import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // Inversion du tri
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0), // ajout de +1 à index pour que le state aille de 0 à 2 et non de 0 à 3. 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  /* Sortie de la div SlideCard__paginationContainer de la map précédente */
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((event, radioIdx) => (
                <input
                  key={`${event.title}`} // Erreur de key : il n'y a pas d'event.id pour ces évènements dans le fichier events.json
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>    
    </div>
  );
};

export default Slider;
