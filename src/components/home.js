import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Chart from 'bk-react-charts';
import domot from '../img/domotica.png'
import {AuthContext} from '../context/authContext';

import M from "materialize-css";

import cerrojosService from '../services/cerrojosService';
import Loader from './subComps/loader';

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
    const [l, setL] = useState(false);

    const [cerrojos, setCerrojos] = useState([]);

    useEffect(() => {
      let elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
      
      setL(false);

      cerrojosService.get().then( res => {

        if(!res.error){
          
          setCerrojos(res.data);
          setL(true);
          
          let elems = document.querySelectorAll('select');
          M.FormSelect.init(elems);

        }

      });
    },[]);

    const onServidorChange = (e) => {
      localStorage.setItem('remoteUrl',e.target.value);
      console.log(e.target.value);
    }

    const unAuthHome = () => {
        return(
      
      <div className="grey lighten-2">
          <br/><br/>
            <div className="row">
              <div className="col s12 m8 offset-m2">
                <div className="card white">
                  <div className="card-content black-text">
                    <h5 className="center-align"><b>Bienvenid@ A Domotica Con Proteus</b></h5>
                    <div className="input-field col s12">
                    <select name="tipo" onChange={onServidorChange}>
                        <option value="http://localhost/xdt_domohome/public/" disabled selected>Seleccione una opcion:</option>
                        <option value="http://localhost/xdt_domohome/public/">Local</option>
                        <option value="https://bienvenido.xpertdt.xyz/web/public/index.php/">Remoto</option>
                        <option value="https://bienvenido.xpertdt.xyz/public/index.php/">Pruebas</option>
                    </select>
                    <label>Elija un servidor</label>
                  </div>
                  <br/><br/><br/>
                </div>
              </div>
            </div>

              <div className="col s12 m8 offset-m2">
              <div className="card horizontal">
                <div className="card-image">
                  <img className="responsive-img" src={domot}/>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <h5><b>AQUI UN PEQUEÑO CONCEPTO SOBRE DOMOTICA</b></h5>
                    <br/>
                    <p style={{textAlign:'justify'}}>Se llama domótica a los sistemas capaces de automatizar una vivienda o edificación de cualquier tipo, 
                      aportando servicios de gestión energética, seguridad, bienestar y comunicación, y que pueden estar 
                      integrados por medio de redes interiores y exteriores de comunicación, cableadas o inalámbricas, 
                      y cuyo control goza de cierta ubicuidad, desde dentro y fuera del hogar.</p>
                  </div>
                  <div className="card-action">
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
      return(<>{ !l ? <Loader/> :
      <div className="row">
      <div className="col s12">
          <div className="card white" id="paso1">
            <div className="card-content black-text">
              <div className="card-title"><center><h5>BIENVENID@ A DOMOTICA CON PROTEUS</h5></center></div>
              <div className="input-field col s12">
                <select name="tipo" onChange={onServidorChange}>
                    <option value="http://localhost/xdt_domohome/public/" disabled selected>Seleccione una opcion:</option>
                    <option value="http://localhost/xdt_domohome/public/">Local</option>
                    <option value="bienvenido.xpertdt.xyz/web/public/index.php/">Remoto</option>
                    <option value="https://bienvenido.xpertdt.xyz/public/index.php/">Pruebas</option>
                </select>
                <label>Elija un servidor</label>
              </div>
              <br/><br/><br/>
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
              <div className="card-title"><h5>INGRESOS AL HOGAR</h5></div>
                <table className="responsive-table">
                  <thead>
                    <tr>
                        <th>Puerta</th>
                        <th>Veces Que Se Abrio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cerrojos.map( item => {
                      return(<tr>
                        <td>{item.name}</td>
                        <td>{item.vabrir}</td>
                      </tr>)
                    })}
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
      }</>)
    }

    return(
     <div>
         { !isAuth ? unAuthHome() : AuthHome(user.Type) }
     </div>   
    
)
}

export default Home;