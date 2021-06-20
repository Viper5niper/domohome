import React, {useState, useEffect, useRef} from 'react';

import aspService from '../services/aspService';

import sprinklerOn from './img/aspersor.gif';
import sprinklerOff from './img/aspersor-off.gif';

import Loader from './subComps/loader';

import M from "materialize-css";

var WaterOn, WaterOff;

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
  
const Aspersor = props => {

  const [l, setL] = useState(false);
  const [eWater, setEWater] = useState([]);

  const [pasp, setPasp] = useState({ asp : "", orden : ""});
  const [isProg, setIsProg] = useState(false);

  const first = useRef(true);

    useEffect(() => {

    WaterOn = new Audio("./mp3/WaterOn.mp3");
    WaterOff = new Audio("./mp3/WaterOff.mp3");

    aspService.get().then( res =>{ //busqueda de luces

      if(!res.error){

        //console.log(res.data);
        setEWater(res.data);
        setL(true);
        
        var el = document.querySelector('.modal');
        M.Modal.init(el, {});
        el = document.querySelector('.datepicker');
        M.Datepicker.init(el,{ defaultDate : Date.now(), setDefaultDate : true, i18n : spanishDates});
        el = document.querySelector('.timepicker');
        M.Timepicker.init(el,{});

      }

    });

    },[]);
  
    useEffect(() => {
      if(!first.current){
            let el = document.querySelector('.datepicker');
            M.Datepicker.init(el,{ defaultDate : Date.now(), setDefaultDate : true, i18n : spanishDates});
            el = document.querySelector('.timepicker');
            M.Timepicker.init(el,{ twelveHour : false});
  
            return;
      }
    },[isProg]);

  const changeWater = (e) => {
    //console.log(e.target.name , e.target.checked);

    e.preventDefault();
    e.stopPropagation();

    aspService.control(e.target.name, e.target.checked ? 'E' : 'A')
    .then( res => {

      if(!res.error){

        let filtered = eWater.filter( item => item.dkey !== res.newState.dkey );
        
        res.newState.encendida ? WaterOn.play() : WaterOff.play();//reproducimos el sonido correspondiente

        setEWater([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api
        
      }

    })

  }

  const handleProgramar = (e) => {
    e.preventDefault();

    var fecha, tiempo;

    let ele = document.querySelector('#fecha');
    fecha = M.Datepicker.getInstance(ele).date;

    ele = document.querySelector('#hora');
    tiempo = M.Timepicker.getInstance(ele).time;

    var a = tiempo.split(':'); // split it at the colons
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60; // minutes are worth 60 seconds. Hours are worth 60 minutes.
    fecha.setSeconds( fecha.getHours() + seconds );
    let timestamp = Math.floor(fecha.getTime() / 1000);

    setIsProg(true);
    aspService.programar(pasp.asp, pasp.orden, timestamp).then(res => {

      if(!res.error){
        setIsProg(false);
        
        M.toast({html: res.message})

        let ele = document.querySelector('#modal1');
        let mdl = M.Modal.getInstance(ele);
        mdl.close();
      }

    });

    console.log(pasp);
    //console.log(date.date);
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
            <input className="with-gap" name="orden" type="radio" onChange={(e) => setPasp({...pasp, orden : "E"})} required/>
            <span>Encendido</span>
        </label></p>
        <p className="col s12 m6"><label>
            <input className="with-gap" name="orden" type="radio"  onChange={(e) => setPasp({...pasp, orden : "A"})} required/>
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
  
  const Agua = (props) => {
    
    let item = eWater.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" src={item.encendida ? sprinklerOn : sprinklerOff}/>
          </div>
        </div>
      </div>
    )
  }
  
  const controlAG = (props) => {
  
  let item = eWater.find( item => item.dkey === props.id);

  return(<>
  <div className="row">
    <div className="switch">
      <label>
        OFF
        <input name={props.id} type="checkbox" onChange={changeWater}
        checked={item.encendida}/>
        <span class="lever"></span>
        ON
      </label>
    </div>
  </div>

  <div className="row">  
  <a class="waves-effect btn indigo darken-1 modal-trigger" href="#modal1"
  onClick={(e) => setPasp({...pasp, asp : props.id})}>
       Programar
      <i class="material-icons left">watch_later</i>
    </a>
  </div>
  </>
    )
  }

    return(<>
      {!l ? <Loader/> :
      <div className="row">
        <div className="col s12">
              {Agua({name : "Aspersor 1", id: "AP", tam: "col s6 m3"})}
              {Agua({name : "Aspersor 2", id: "AP", tam: "col s6 m3"})}
              {Agua({name : "Aspersor 3", id: "AP", tam: "col s6 m3"})}
              {Agua({name : "Aspersor 4", id: "AP", tam: "col s6 m3"})}
          </div>

        <div className="col s12">
          <div className="card grey lighten-2 col s12 m6 offset-m3">
            <div className="card-content center-align">
              {controlAG({id : 'AP'})}
            </div>
          </div>
        </div>
        {ModalProgramar()}
      </div>
      }
     </>
    )
}
export default Aspersor;