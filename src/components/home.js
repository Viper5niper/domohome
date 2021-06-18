import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Chart from 'bk-react-charts';
import domot from '../img/domotica.png'
import {AuthContext} from '../context/authContext';

// import { Steps } from 'intro.js-react';

// const steps = [
//   {
//     element: '#paso1',
//     intro: 'test 1',
//     position: 'right',
//     tooltipClass: 'myTooltipClass',
//     highlightClass: 'myHighlightClass',
//   },
//   {
//     element: '#paso2',
//     intro: 'test 2',
//   },
//   {
//     element: '#paso3',
//     intro: 'test 3',
//   },
// ];

const Home = () => {

    const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data));
      // }
    },[]);

    const unAuthHome = () => {
        return(
      <div className="pixelBG grey lighten-2">
          <br/><br/>
            <div className="row">
              <div className="col s12 m8 offset-m2">
                <div className="card white">
                  <div className="card-content black-text">
                    <h4 className="center-align"><b>Bienvenid@ A Domotica Con Proteus</b></h4>
                </div>
              </div>
            </div>

              <div class="col s12 m8 offset-m2">
              <div class="card horizontal">
                <div class="card-image">
                  <img src={domot}/>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <h5><b>AQUI UN PEQUEÑO CONCEPTO SOBRE DOMOTICA</b></h5>
                    <br/>
                    <p style={{textAlign:'justify'}}>Se llama domótica a los sistemas capaces de automatizar una vivienda o edificación de cualquier tipo, 
                      aportando servicios de gestión energética, seguridad, bienestar y comunicación, y que pueden estar 
                      integrados por medio de redes interiores y exteriores de comunicación, cableadas o inalámbricas, 
                      y cuyo control goza de cierta ubicuidad, desde dentro y fuera del hogar. Se podría definir como la 
                      integración de la tecnología en el diseño inteligente de un recinto cerrado.</p>
                  </div>
                  <div class="card-action">
                    <center><Link to='/Login' className="btn indigo darken-1">INGRESAR</Link></center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }

    let data = [
      { month: 'Ene', sales: 35 },
      { month: 'Feb', sales: 37 },
      { month: 'Mar', sales: 39 },
      { month: 'Abr', sales: 38 },
      { month: 'May', sales: 37 },
      { month: 'Jun', sales: 41 },
      { month: 'Jul', sales: 40 },
      { month: 'Agos', sales: 43 },
      { month: 'Sept', sales: 42 },
      { month: 'Oct', sales: 44 },
      { month: 'Nov', sales: 45 },
      { month: 'Dic', sales: 46 }
    ]

    const AuthHome = (tipo) => {
      return(<>
      <div className="row">
      <div className="col s12">
          <div className="card white" id="paso1">
            <div className="card-content black-text">
              <div className="card-title"><center><h5>BIENVENID@ A DOMOTICA CON PROTEUS</h5></center></div>
            </div>
          </div>
        </div>

        <div className="col s7">
          <div className="card white" id="paso2">
            <div className="card-content black-text">
              <div className="card-title"><h5>PROMEDIOS DE TEMPERATURA</h5></div>
            <center><Chart
              height='466px'
              width='700px'
              dataSource={[
                {
                  data: data
                }
              ]}
              xName='month'
              yName='sales'
            /></center> 
            </div>
          </div>
        </div>

        <div className="col s5">
          <div className="card white">
            <div className="card-content black-text" id="paso3">
              <div className="card-title"><h5>N° DE VECES QUE SE ABRIERON LAS PUERTAS</h5></div>
                <table className="responsive-table">
                  <thead>
                    <tr>
                        <th>Puerta</th>
                        <th>N° De Veces Que Se Abrio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Entrada Principal</td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td>Patio</td>
                      <td>40</td>
                    </tr>
                    <tr>
                      <td>Cochera</td>
                      <td>5</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col s5">
          <div className="card white">
            <div className="card-content black-text">
              <div className="card-title"><h6>PROYECTO REALIZADO POR: </h6></div>
              <ul className="collection">
                <li className="collection-item">Ruben Alexander Mulato Gaitan</li>
                <li className="collection-item">Edwin Alejandro Aguilar Hernandez</li>
                <li className="collection-item">Jose Alexis Ayala Zelaya</li>
              </ul>
            </div>
          </div>
        </div>

        {/* <Steps
          enabled={true}
          steps={steps}
        /> */}

      </div>
      </>)
    }

    return(
     <div>
         { !isAuth ? unAuthHome() : AuthHome(user.Type) }
     </div>   
    
)
}

export default Home;