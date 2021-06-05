import React, {useState, useEffect} from 'react';
import defaultImg from '../homeSubComps/img/puerta.jpg';
import defaultImg2 from '../homeSubComps/img/cochera.jpg';
import M from "materialize-css";


const Unlock = props => {

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

    return(<>
      <div className="row">
        <div className="card grey lighten-2 col s12 m12 l12">
          <div className="card-content black-text">
            <div className="col s12 m4 l3">
              <div className="card">
                <div className="card-image">
                 <center><img src={defaultImg} style={{height:190, width:210}}/></center>
                </div>
                <div className="card-content">
                  <p><b>Entrada Principal</b></p>
                </div>
              </div>
            </div>
            <div className="col s12 m3 l3 offset-l1">
            <div className="card">
              <div className="card-image">
              <center><img src={defaultImg} style={{height:190, width:210}}/></center>
              </div>
              <div className="card-content">
                <p><b>Patio</b></p>
              </div>
            </div>
          </div>
          <div className="col s12 m4 l4 offset-l1">
            <div className="card">
              <div className="card-image">
                <center><img src={defaultImg2} style={{height:190, width:250}}/></center>
              </div>
              <div className="card-content">
                <p><b>Cochera</b></p>
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>

     </>
    )

}

export default Unlock;