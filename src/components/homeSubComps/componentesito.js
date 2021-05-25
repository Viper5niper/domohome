import React, {useState, useEffect} from 'react';

import M from "materialize-css";


const Componentesito = props => {

  const [hover, setHover] = useState(false);

  useEffect(() => {
      console.log("la ventaja de crear el componente a parte es que podes hacer funciones especificas para ese componente. Por ejemplo, aca cuando se cargue (useEffect) puedo hacer que tire este console log y no hace bulto en el componente principal (home). Lo mismo podes hacer cuando se le da click al componente. Fijate que cuando pasas el mouse encima solo cambia de color el muy subcomponente y no todo el componente principal que conforma a home, aca podes ver el codigo de como se hizo eso");
  },[]);

  const mouseEntro = () => {
    setHover(true); //lo ponemos al contrario de como estava
  }

  const mouseSalio = () => {
    setHover(false); //lo ponemos al contrario de como estava
  }

    return(
      <span className={ hover ? "red-text" : "blue-text"} onMouseEnter={mouseEntro} onMouseLeave={mouseSalio}>
      Soy un componente declarado a parte, puedo hacer mas cosas que el componente declarado en una funcion. Pasa el mouse encima de mi y comprobalo
      </span>
    )

}

export default Componentesito;