import React, {useState, useEffect, useContext} from 'react';

import lucesService from '../services/lucesService';
import {AuthContext} from '../context/authContext';

import Loader from './subComps/loader';

import focoOn from './img/light-on.png';
import focoOff from './img/light-off.png';

import fanOn from './img/fan-on.png';
import fanOff from './img/fan-off.png';


import M from "materialize-css";

const arrFans = {

  "VA" : {
    NombreFan : "Cuarto 1",
    Encendido : false
  },
  "VB" : { 
    NombreFan : "Cuarto 2",
    Encendido : false
  }
  
};

const arrLuces = {

  "LG" : {
    NombreLuz : "Cochera",
    Encendido : false
  },
  "LP" : {
    NombreLuz : "Patio",
    Encendido : false
  },
  "LA" : {
    NombreLuz : "Cuarto 1",
    Encendido : false
  },
  "LB" : {
    NombreLuz : "Cuarto 2",
    Encendido : false
  },
  "LS" : {
    NombreLuz : "Sala",
    Encendido : false
  },
  "LC" : {
    NombreLuz : "Comedor",
    Encendido : false
  },
  "LE" : {
    NombreLuz : "Entrada",
    Encendido : false
  }
  
};

const Luces = props => {

  //const {isLoaded, setIsLoaded} = useContext(AuthContext);

  const [hover, setHover] = useState(false);
  const [eLuces, setELuces] = useState(arrLuces);
  const [eFans, setEFans] = useState(arrFans);
  const [l, setL] = useState(false);

  useEffect(() => {

      lucesService.get().then( res =>{

        if(!res.error){

          console.log(res.data);
          //setELuces(res.data);
          setL(true);
          
          var el = document.querySelector('.modal');
          M.Modal.init(el, {});
          el = document.querySelector('.datepicker');
          M.Datepicker.init(el,{});
          el = document.querySelector('.timepicker');
          M.Timepicker.init(el,{});

        }

      });

      



    },[]);

  const mouseEntro = () => {
    setHover(true); //lo ponemos al contrario de como estava
  }

  const mouseSalio = () => {
    setHover(false); //lo ponemos al contrario de como estava
  }

  const changeLight = (e) => {
    //console.log(e.target.name , e.target.checked);

    let auxL = eLuces[e.target.name];

    auxL.Encendido = e.target.checked;

    setELuces({...eLuces, [e.target.name] : auxL});

  }

  const changeFan = (e) => {
    //console.log(e.target.name , e.target.checked);

    let auxL = eFans[e.target.name];

    auxL.Encendido = e.target.checked;

    setEFans({...eFans, [e.target.name] : auxL});

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

  const Luz = (props) => {

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={eLuces[props.id].Encendido ? focoOn : focoOff}/>
                </div>
                <div className="card-content center-align">

                <div class="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeLight}
                    checked={eLuces[props.id].Encendido}/>
                    <span class="lever"></span>
                    ON
                  </label>
                </div>
                <br/>
                <a class="waves-effect blue darken-4 btn modal-trigger" href="#modal1">
                {props.name}
                <i class="material-icons left">watch_later</i>
                </a>

                </div>
              </div>
            </div>
    )
  }

  const Fan = (props) => {

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={eFans[props.id].Encendido ? fanOn : fanOff}/>
                </div>
                <div className="card-content center-align">

                <div class="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeFan}
                    checked={eFans[props.id].Encendido}/>
                    <span class="lever"></span>
                    ON
                  </label>
                </div>

                <br/>
                <a class="waves-effect blue darken-4 btn modal-trigger" href="#modal1">
                {props.name}
                <i class="material-icons left">watch_later</i>
                </a>
                </div>
              </div>
            </div>
    )
  }

    return(<>
      {!l ? <Loader/> :
      <div className="row">

      <div className="col s6">

          {Luz({name : "Cochera", id: "LG", tam: "col s6 m4"})}
          {Luz({name : "Comedor", id: "LC", tam: "col s6 m4"})}
          {Luz({name : "Sala", id: "LS", tam: "col s6 m4"})}
          {Luz({name : "Patio", id: "LP", tam: "col s6 m4 offset-m2"})}
          {Luz({name : "Entrada", id: "LE", tam: "col s6 m4"})}

      </div>
      
      <div className="col s6">
          {Luz({name : "Cuarto 1", id: "LA" , tam: "col s6 m4 offset-m4"})}
          {Fan({name : "Cuarto 1", id: "VA", tam: "col s6 m4"})}
          {Luz({name : "Cuarto 2", id: "LB", tam: "col s6 m4 offset-m4"})}
          {Fan({name : "Cuarto 2", id: "VB", tam: "col s6 m4"})}
      </div>
      {ModalProgramar()}
    </div>
    }
     </>
    )

}

export default Luces;