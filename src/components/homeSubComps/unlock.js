import React, {useState, useEffect} from 'react';


import garageOn from '../homeSubComps/img/cochera.jpg';
import garageOff from '../homeSubComps/img/cochera-open.jpg';
import entradaOn from '..//homeSubComps/img/door.jpg';
import entradaOff from '../homeSubComps/img/door-close.jpg';
import ReactCodeInput from 'react-verification-code-input';

import M from "materialize-css";

const arrCochera = {
  "SG" : {
    NombreLuz : "Cochera",
    Encendido : false
  }
};

const arrPatio = {
  "SP" : {
    NombreLuz : "Patio",
    Encendido : false
  }
}

const arrEntrada = {
  "SE" : {
    NombreLuz : "Entrada",
    Encendido : false
  }
}

const Unlock = props => {

  const [hover, setHover] = useState(false);
  const [eCochera, setCochera] = useState(arrCochera);
  const [eEntrada, setEntrada] = useState(arrEntrada);
  const [ePatio, setPatio] = useState(arrPatio);

  useEffect(() => {
      //setCochera(arrCochera);
      console.log("la ventaja de crear el componente a parte es que podes hacer funciones especificas para ese componente. Por ejemplo, aca cuando se cargue (useEffect) puedo hacer que tire este console log y no hace bulto en el componente principal (home). Lo mismo podes hacer cuando se le da click al componente. Fijate que cuando pasas el mouse encima solo cambia de color el muy subcomponente y no todo el componente principal que conforma a home, aca podes ver el codigo de como se hizo eso");
  },[]);

  const mouseEntro = () => {
    setHover(true); //lo ponemos al contrario de como estava
  }

  const mouseSalio = () => {
    setHover(false); //lo ponemos al contrario de como estava
  }

  const changeCochera = (e) => {
    //console.log(e.target.name , e.target.checked);

    let auxL = eCochera[e.target.name];

    auxL.Encendido = e.target.checked;

    setCochera({...eCochera, [e.target.name] : auxL});

  }

  const changeEntrada = (e) => {

    let auxL = eEntrada[e.target.name];

    auxL.Encendido = e.target.checked;

    setEntrada({...eEntrada, [e.target.name] : auxL});

  }

  const changePatio = (e) => {

    let auxL = ePatio[e.target.name];

    auxL.Encendido = e.target.checked;

    setPatio({...ePatio, [e.target.name] : auxL});

  }

  const Cochera = (props) => {

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={eCochera[props.id].Encendido ? garageOff : garageOn}/>
                </div>
                <div className="card-content center-align">
                <br/>
                  <ReactCodeInput fields={4} fieldWidth="58px"/>
                </div>
              </div>
            </div>
    )
  }

  const Entrada = (props) => {

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={eEntrada[props.id].Encendido ? entradaOn : entradaOff}/>
                </div>
                <div className="card-content center-align">

                <div class="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeEntrada}/>
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
            {Cochera({name : "Cochera", id: "SG", tam: "col s6 m5"})}
            {Entrada({name : "Entrada", id: "SE", tam: "col s6 m3"})}
        </div>
    </div>

     </>
    )

}

export default Unlock;