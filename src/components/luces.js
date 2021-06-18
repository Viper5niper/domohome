import React, {useState, useEffect, useContext, useRef} from 'react';

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
  const [isProg, setIsProg] = useState(false);

  const [pluz, setPluz] = useState({luz : "", orden : ""})

  const first = useRef(true);


  useEffect(() => {


    if(!first.current){

          let el = document.querySelector('.datepicker');
          M.Datepicker.init(el,{ defaultDate : Date.now(), setDefaultDate : true, i18n : spanishDates});
          el = document.querySelector('.timepicker');
          M.Timepicker.init(el,{ twelveHour : false});

          return;

    }

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
          M.Timepicker.init(el,{ twelveHour : false});

          var el = document.querySelectorAll('.fixed-action-btn');
          M.FloatingActionButton.init(el, {});

          first.current = false;

        }

      });

    }});//fin busqueda de vents

    },[isProg]);
  
  const handleProgramar = (e) => {
    e.preventDefault();

    var fecha, tiempo;

    let ele = document.querySelector('.datepicker');
    fecha = M.Datepicker.getInstance(ele).date;

    ele = document.querySelector('.timepicker');
    tiempo = M.Timepicker.getInstance(ele).time;

    var a = tiempo.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60; // minutes are worth 60 seconds. Hours are worth 60 minutes.
    fecha.setSeconds( fecha.getHours() + seconds );
    let timestamp = Math.floor(fecha.getTime() / 1000);

    setIsProg(true);
    lucesService.programar(pluz.luz, pluz.orden, timestamp).then(res => {

      if(!res.error){
        setIsProg(false);
        
        M.toast({html: res.message})

        let ele = document.querySelector('.modal');
        let mdl = M.Modal.getInstance(ele);
        mdl.close();
      }

    });

    console.log(pluz);
    //console.log(date.date);
  }

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

  const changeAllLights = (e,opcion) => {

    lucesService.todas(opcion).then( res => {

      if(!res.error){

        opcion == 'E' ? LampOn.play() : LampOff.play();//reproducimos el sonido correspondiente

        setELuces(res.newState);

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

  const changeAllFans = (e,opcion) => {

    ventsService.todas(opcion).then( res => {

      if(!res.error){

        opcion == 'E' ? LampOn.play() : LampOff.play();//reproducimos el sonido correspondiente

        setEFans(res.newState);

      }

    })

  }
  
  const ModalProgramar= () =>{

    return(
      
    <div id="modal1" className="modal" style={{maxuHeight : '90%', height : '70%',  width : '70%'}}>
    <div className="modal-content">
    {isProg ? <Loader/> : 
    <form onSubmit={handleProgramar}>
    <div className="row">

        <blockquote>Elija la accion que desea programar</blockquote>

        <p className="col s12 m6"><label>
            <input className="with-gap" name="orden" type="radio" onChange={(e) => setPluz({...pluz, orden : "E"})} required/>
            <span>Encendido</span>
        </label></p>
        <p className="col s12 m6"><label>
            <input className="with-gap" name="orden" type="radio"  onChange={(e) => setPluz({...pluz, orden : "A"})} required/>
            <span>Apagado</span>
        </label></p>

    </div>

    <div className="row">

        <blockquote>Elija la fecha y hora a la que se debe ejecutar esa accion</blockquote>

        <div className="input-field col s12 m6">
          <input id="hora" type="text" className="timepicker" required/>
          <label htmlFor="hora">Programar Hora De Encendido/Apagado</label>
        </div>
        <div className="input-field col s12 m6">
          <input id="fecha" type="text" className="datepicker" required/>
          <label htmlFor="fecha">Programar Fecha De Encendido/Apagado</label>
        </div>

    </div>
    
    <button className="waves-effect btn indigo darken-1" type="submit">
    Programar accion
    <i className="material-icons right">schedule_send</i>
    </button>
    </form>}
    
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
                <a className="waves-effect indigo darken-1 btn modal-trigger" href="#modal1" 
                onClick={(e) => setPluz({...pluz, luz : props.id})}>
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

  const BtnExtra = () => {
    return(
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large indigo darken-1">
          <i className="large material-icons">dialpad</i>
        </a>
        <ul>
          <li><button onClick={(e) => changeAllLights(e,'E')} className="btn-floating indigo darken-1"><i className="material-icons">brightness_high</i></button></li>
          <li><button onClick={(e) => changeAllLights(e,'A')}  className="btn-floating indigo darken-1 waves-light"><i className="material-icons">brightness_low</i></button></li>
          <li><button onClick={(e) => changeAllFans(e,'E')} className="btn-floating indigo darken-1"><i className="material-icons">air</i></button></li>
          <li><button onClick={(e) => changeAllFans(e,'A')} className="btn-floating indigo darken-1"><i className="material-icons">block</i></button></li>
        </ul>
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
      {BtnExtra()}
    </div>


    }
     </>
    )

}

export default Luces;