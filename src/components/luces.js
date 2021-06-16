import React, {useState, useEffect, useContext} from 'react';

import lucesService from '../services/lucesService';
import {AuthContext} from '../context/authContext';

import Loader from './subComps/loader';

import focoOn from './img/light-on.png';
import focoOff from './img/light-off.png';

import fanOn from './img/fan-on.png';
import fanOff from './img/fan-off.png';


import M from "materialize-css";
import ventsService from '../services/ventsService';

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


const spanishDates = {
months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  selectMonths: true,
  selectYears: 100, // Puedes cambiarlo para mostrar más o menos años
  today: 'Hoy',
  clear: 'Limpiar',
  done: 'Ok',
  labelMonthNext: 'Siguiente mes',
labelMonthPrev: 'Mes anterior',
labelMonthSelect: 'Selecciona un mes',
labelYearSelect: 'Selecciona un año',
weekdaysAbbrev: ['D','L','M','X','J','V','S'],
};

var LampOn, LampOff;

const Luces = props => {

  //const {isLoaded, setIsLoaded} = useContext(AuthContext);

  const [eLuces, setELuces] = useState([]);
  const [eFans, setEFans] = useState([]);
  const [l, setL] = useState(false);


  useEffect(() => {
    LampOn = new Audio("./mp3/LampOn.mp3");
    LampOff = new Audio("./mp3/LampOff.mp3");

    ventsService.get().then( res =>{ //busqueda de vents

      if(!res.error){

      setEFans(res.data);

      lucesService.get().then( res =>{ //busqueda de luces

        if(!res.error){

          //console.log(res.data);
          setELuces(res.data);
          setL(true);
          
          var el = document.querySelector('.modal');
          M.Modal.init(el, {});
          el = document.querySelector('.datepicker');
          M.Datepicker.init(el,{ defaultDate : Date.now(), setDefaultDate : true, i18n : spanishDates});
          el = document.querySelector('.timepicker');
          M.Timepicker.init(el,{});

        }

      });

    }});//fin busqueda de vents

    },[]);

  const changeLight = (e) => {

    e.preventDefault();
    e.stopPropagation();

    lucesService.control(e.target.name, e.target.checked ? 'E' : 'A')
    .then( res => {

      if(!res.error){

        let filtered = eLuces.filter( item => item.dkey !== res.newState.dkey );
        
        res.newState.encendida ? LampOn.play() : LampOff.play();//reproducimos el sonido correspondiente

        setELuces([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api
        
      }

    })

    

  }

  const changeFan = (e) => {
    
    e.preventDefault();
    e.stopPropagation();

    ventsService.control(e.target.name, e.target.checked ? 'E' : 'A')
    .then( res => {

      if(!res.error){

        let filtered = eFans.filter( item => item.dkey !== res.newState.dkey );
        
        setEFans([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api
        
      }

    })

  }
  
  const ModalProgramar= () =>{

    return(
      
    <div id="modal1" className="modal" style={{maxuHeight : '90%', height : '70%',  width : '70%'}}>
    <div className="modal-content">
    <div className="row">

        <blockquote>Elija la accion que desea programar</blockquote>

        <p className="col s12 m6"><label>
            <input className="with-gap" name="orden" type="radio"  />
            <span>Encendido</span>
        </label></p>
        <p className="col s12 m6"><label>
            <input className="with-gap" name="orden" type="radio"  />
            <span>Apagado</span>
        </label></p>

    </div>

    <div className="row">

        <blockquote>Elija la fecha y hora a la que se debe ejecutar esa accion</blockquote>

        <div className="input-field col s12 m6">
          <input id="hora" type="text" className="timepicker"/>
          <label htmlFor="hora">Programar Hora De Encendido/Apagado</label>
        </div>
        <div className="input-field col s12 m6">
          <input id="fecha" type="text" className="datepicker"/>
          <label htmlFor="fecha">Programar Fecha De Encendido/Apagado</label>
        </div>

    </div>
    </div>
  </div>
    )
  }

  const Luz = (props) => {

    let item = eLuces.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={item.encendida ? focoOn : focoOff}/>
                </div>
                <div className="card-content center-align">

                <div className="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeLight}
                    checked={item.encendida}/>
                    <span className="lever"></span>
                    ON
                  </label>
                </div>
                <br/>
                <a className="waves-effect indigo darken-1 btn modal-trigger" href="#modal1">
                {props.name}
                <i className="material-icons left">watch_later</i>
                </a>

                </div>
              </div>
            </div>
    )
  }

  const Fan = (props) => {

    let item = eFans.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={item.encendida ? fanOn : fanOff}/>
                </div>
                <div className="card-content center-align">

                <div className="switch">
                  <label>
                    OFF
                    <input name={props.id} type="checkbox" onChange={changeFan}
                    checked={item.encendida}/>
                    <span className="lever"></span>
                    ON
                  </label>
                </div>

                <br/>
                <a className="waves-effect indigo darken-1 btn modal-trigger" href="#modal1">
                {props.name}
                <i className="material-icons left">watch_later</i>
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