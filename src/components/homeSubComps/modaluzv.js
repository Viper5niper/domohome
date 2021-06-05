import React, {useState, useEffect} from 'react';
import M from "materialize-css";


const Modal = props => {

  const [hover, setHover] = useState(false);

  useEffect(() => {
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

    return(<>
  <a class="waves-effect blue darken-4 btn modal-trigger" href="#modal1">
  <i class="material-icons center">watch_later</i>
  </a>

<div className="input-field">
  <div id="modal1" className="modal">
    <div className="modal-content">
    <div class="row">
        <div class="input-field col s12">
          <input type="text" className="timepicker"/>
          <label>Programar Hora De Encendido/Apagado</label>
        </div>
        <div class="input-field col s12">
          <input type="text" className="datepicker"/>
          <label for="password">Programar Fecha De Encendido/Apagado</label>
        </div>
    </div>
    </div>
  </div>
</div>

     </>
    )

}

export default Modal;