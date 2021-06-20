import React, {useState, useEffect, useRef} from 'react';

import cerrojosService from '../services/cerrojosService';

import garageOn from './img/garage-open.png';//aaaa
import garageOff from './img/garage-close.png';
import entradaOn from './img/door.jpg';
import entradaOff from './img/door-close.jpg';
import patioOn from './img/patio-open.png';
import patioOff from './img/patio-close.png';
import ReactCodeInput from 'react-verification-code-input';
import Loader from './subComps/loader';

import M from "materialize-css";

var DoorOn, DoorOff, GarageToggle, beep;

const Unlock = props => {

  const [cerrojos, setCerrojos] = useState([]);
  const [l, setL] = useState(false);
  const [entrance, setEntrance] = useState({cerr: "", orden : "", code : ""})
  const [isOpening, setIsOpening] = useState(false);

  const first = useRef(true);

  useEffect(() => {   

      GarageToggle = new Audio("./mp3/GarageToggle.mp3");
      DoorOn = new Audio("./mp3/DoorOn.mp3");
      DoorOff = new Audio("./mp3/DoorOff.mp3");
      beep = new Audio("./mp3/beep.mp3");

      cerrojosService.get().then( res => {

        if(!res.error){
          
          setCerrojos(res.data);
          setL(true);

          var el = document.querySelector('.modal');
          M.Modal.init(el, {});

        }

      });
  },[]);


  useEffect(() => {   
    if(!first.current){

      return;
    }
},[isOpening]);


  const changeCerr = (e) => {
    //console.log(e.target.name , e.target.checked);

    e.preventDefault();
    e.stopPropagation();

    cerrojosService.control(e.target.name, e.target.checked ? 'E' : 'A')
    .then( res => {

      if(!res.error){

        let filtered = cerrojos.filter( item => item.dkey !== res.newState.dkey );
        
        GarageToggle.play();//reproducimos un sonido

        setCerrojos([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api
        
      }

    })

  }

  const changeEntrada = (e) => {

    let op = e.target.checked ? 'E' : 'A';

    setEntrance({...entrance, cerr : e.target.name, orden : op})

    if(op === 'E'){
      let ele = document.querySelector('#modal');
      let mdl = M.Modal.getInstance(ele);
      mdl.open();
    }else{

      cerrojosService.control(e.target.name, op)
      .then( res => {
  
        if(!res.error){
          let filtered = cerrojos.filter( item => item.dkey !== res.newState.dkey );
          DoorOff.play();
          setCerrojos([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api      
        }
      }) 

    }

  }

  const abrirEntrada = (e) => {

    e.preventDefault();

    setIsOpening(true);

    let {cerr, orden, code} = entrance;

    cerrojosService.entrada(cerr, orden, code).then( res => {

      

      if(res.error){

        setIsOpening(false);
        res.log.map( item => M.toast({html : item}));
      }
      else{
        M.toast({html : res.message});
        
        let filtered = cerrojos.filter( item => item.dkey !== res.newState.dkey );
        
        DoorOn.play();

        setCerrojos([...filtered, res.newState]);//new state es el nuevo estado del foco devuelto por la api
        
        setIsOpening(false);

        let ele = document.querySelector('#modal');
        let mdl = M.Modal.getInstance(ele);
        mdl.close();

      }


    })

    console.log(entrance);
  }
  
  const Cochera = (props) => {

    let item = cerrojos.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={item.encendida ? garageOn : garageOff}/>
                  <span className="card-title indigo-text text-darken-1"><b>{props.name}</b></span>
                </div>
                <div className="card-content center-align">
                <div class="switch">
                  <label>
                    CLOSE
                    <input name={props.id} type="checkbox" onChange={changeCerr}
                    checked={item.encendida}/>
                    <span className="lever"></span>
                    OPEN
                  </label>
                </div>
                </div>
              </div>
            </div>
    )
  }

  const Entrada = (props) => {

    let item = cerrojos.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img" src={item.encendida ? entradaOn : entradaOff}/>
                  <span className="card-title indigo-text text-darken-1"><b>{props.name}</b></span>
                </div>
                <div className="card-content center-align">
                  
                  <div class="switch">
                  <label>
                    CLOSE
                    <input name={props.id} type="checkbox" onChange={changeEntrada}
                    checked={item.encendida}/>
                    <span class="lever"></span>
                    OPEN
                  </label>
                </div>

                </div>
              </div>
            </div>
    )
  }

  const Patio = (props) => {

    let item = cerrojos.find( item => item.dkey === props.id);

    return(
      <div className={props.tam}>
              <div className="card">
                <div className="card-image">
                  <img className="responsive-img"  src={item.encendida ? patioOn : patioOff}/>
                  <span className="card-title indigo-text text-darken-1"><b>{props.name}</b></span>
                </div>
                <div className="card-content center-align">
                <div class="switch">
                  <label>
                    CLOSE
                    <input name={props.id} type="checkbox" onChange={changeCerr}
                    checked={item.encendida}/>
                    <span class="lever"></span>
                    OPEN
                  </label>
                </div>
                </div>
              </div>
            </div>
    )
  }

  const PinHandle = (vals) => {

    beep.play();
    setEntrance({...entrance, code : vals});

  }

  const ModalPin = () =>{

    return(
      
    <div id="modal" className="modal" style={{maxuHeight : '90%', height : '50%',  width : '50%'}}>
    <div className="modal-content">
    {isOpening ? <Loader/> : 
    <form onSubmit={abrirEntrada}>
    <div className="row cemter-align">

        <blockquote>Ingrese su pin secreto</blockquote>

        <ReactCodeInput fields={4} fieldWidth="58px" 
        onChange={(vals)=> PinHandle(vals)}/>
    </div>
    <button className="waves-effect btn indigo darken-1" type="submit">
    Enviar
    <i className="material-icons right">send</i>
    </button>
    </form>}
    
    </div>
  </div>
    )
  }

    return(<>
    {!l ? <Loader/> : 
      <div className="row">
        <div className="col s12">
            {Cochera({name : "Cochera", id: "CG", tam: "col s6 m4"})}
            {Entrada({name : "Entrada", id: "CE", tam: "col s6 m4"})}
            {Patio({name : "Patio", id: "CP", tam: "col s6 m4"})}
        </div>
        {ModalPin()}
    </div>
    }

     </>
    )

}

export default Unlock;