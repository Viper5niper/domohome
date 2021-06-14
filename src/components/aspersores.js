import React, {useState, useEffect} from 'react';


import sprinklerOn from './img/aspersor.gif';
import sprinklerOff from './img/aspersor-off.gif';

import M from "materialize-css";


const arrSprinkler = {

  "S1" : {
    NombreAspersor : "Aspersor 1",
    Encendido : false
  },
  "S2" : {
    NombreAspersor : "Aspersor 2",
    Encendido : false
  },
  "S3" : {
    NombreAspersor : "Aspersor 3",
    Encendido : false
  },
  "S4" : {
    NombreAspersor : "Aspersor 4",
    Encendido : false
  }
  
};

const Aspersor = props => {

  const [hover, setHover] = useState(false);
  const [eWater, setEWater] = useState(arrSprinkler);

  useEffect(() => {
      //setELuces(arrLuces);
      console.log("la ventaja de crear el componente a parte es que podes hacer funciones especificas para ese componente. Por ejemplo, aca cuando se cargue (useEffect) puedo hacer que tire este console log y no hace bulto en el componente principal (home). Lo mismo podes hacer cuando se le da click al componente. Fijate que cuando pasas el mouse encima solo cambia de color el muy subcomponente y no todo el componente principal que conforma a home, aca podes ver el codigo de como se hizo eso");
      var el = document.querySelector('.modal');
      M.Modal.init(el, {});
      el = document.querySelector('.datepicker');
      M.Datepicker.init(el,{});
      el = document.querySelector('.timepicker');
      M.Timepicker.init(el,{});
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

  const ModalProgramar= () =>{
    var clase = {}
    return(
      
    <div id="modal1" className="modal" style={{maxHeight : '90%', height : '70%'}}>
    <div className="modal-content">
    <div class="row">

        <blockquote>Elija la fecha y hora en que desea programar el evento</blockquote>

        <div class="input-field col s12">
          <input id="hora" type="text" className="timepicker"/>
          <label for="hora">Programar Hora De Encendido/Apagado</label>
        </div>
        <div class="input-field col s12">
          <input id="fecha" type="text" className="datepicker"/>
          <label for="fecha">Programar Fecha De Encendido/Apagado</label>
        </div>
    </div>
    </div>
  </div>
    )
  }
  
  const Agua = (props) => {

    return(
      <div className={props.tam}>
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" src={eWater[props.id].Encendido ? sprinklerOn : sprinklerOff}/>
          </div>
        </div>
      </div>
    )
  }
  
  const controlAG = (props) => {
    return(<>
  <div className="row">
    <div className="switch">
      <label>
        OFF
        <input type="checkbox"
        />
        <span class="lever"></span>
        ON
      </label>
    </div>
  </div>

  <div className="row">  
  <a class="waves-effect blue darken-4 btn modal-trigger" href="#modal1">
       Programar
      <i class="material-icons left">watch_later</i>
    </a>
  </div>
  </>
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
 

    <div className="col s12">
      <div className="card grey lighten-2 col s12 m6 offset-m3">
        <div className="card-content center-align">
          {controlAG()}
          {ModalProgramar()}
        </div>
      </div>
    </div>
  </div>
     </>
    )
}
export default Aspersor;