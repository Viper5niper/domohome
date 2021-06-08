import React, {useState, useEffect} from 'react';


import sprinklerOn from '../homeSubComps/img/aspersor.gif';
import sprinklerOff from '../homeSubComps/img/aspersor-off.gif';

import M from "materialize-css";
import Modal from './modaluzv';

const arrSprinkler = {

  "S1" : {
    NombreLuz : "Aspersor 1",
    Encendido : false
  },
  "S2" : {
    NombreLuz : "Aspersor 2",
    Encendido : false
  },
  "S3" : {
    NombreLuz : "Aspersor 3",
    Encendido : false
  },
  "S4" : {
    NombreLuz : "Aspersor 4",
    Encendido : false
  }
  
};

const Aspersor = props => {

  const [hover, setHover] = useState(false);
  const [eWater, setEWater] = useState(arrSprinkler);

  useEffect(() => {
      //setELuces(arrLuces);
      console.log("la ventaja de crear el componente a parte es que podes hacer funciones especificas para ese componente. Por ejemplo, aca cuando se cargue (useEffect) puedo hacer que tire este console log y no hace bulto en el componente principal (home). Lo mismo podes hacer cuando se le da click al componente. Fijate que cuando pasas el mouse encima solo cambia de color el muy subcomponente y no todo el componente principal que conforma a home, aca podes ver el codigo de como se hizo eso");
  },[]);

  const mouseEntro = () => {
    setHover(true); //lo ponemos al contrario de como estava
  }

  const mouseSalio = () => {
    setHover(false); //lo ponemos al contrario de como estava
  }

  const changeWater = (e) => {
    //console.log(e.target.name , e.target.checked);

    let auxL = eWater[e.target.name];

    auxL.Encendido = e.target.checked;

    setEWater({...eWater, [e.target.name] : auxL});

  }
  
  const Agua = (props) => {

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={eWater[props.id].Encendido ? sprinklerOn : sprinklerOff}/>
                </div>
                <div className="card-content center-align">
                <br/>
                <div class="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeWater}/>
                    <span class="lever"></span>
                    ON
                  </label>
                </div>
                </div>
              </div>
            </div>
    )
  }

    return(<>
      <div className="row">

      <div className="col s12">
          {Agua({name : "Aspersor 1", id: "S1", tam: "col s6 m3"})}
          {Agua({name : "Aspersor 2", id: "S2", tam: "col s6 m3"})}
          {Agua({name : "Aspersor 3", id: "S3", tam: "col s6 m3"})}
          {Agua({name : "Aspersor 4", id: "S4", tam: "col s6 m3"})}

      </div>
    </div>

     </>
    )
}
export default Aspersor;