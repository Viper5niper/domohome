import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Chart from 'bk-react-charts';

import {AuthContext} from '../context/authContext';


const Home = () => {

    const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data));
      // }
    },[]);

    const unAuthHome = () => {
        return(
            <div>
            <Link to='/Login'>Loguearse</Link>
            <p>Has cerrado la sesion, aca quiero que vaya una pagina de bienvenida al usuario. Es decision tuya si queres hacer a parte el login o aca mismo. Recorda que por ahora solo importa el maquetado y no el funcionamiento, deja todo ordenado dentro de divs, y dividi las secciones en cards. Si queres volver a ver el inicio recarga la pagina, y para volver aca clickea el boton de cerrar sesion</p>

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
          <div className="card white">
            <div className="card-content black-text">
              <div className="card-title"><center><h5>BIENVENID@ A DOMOTICA CON PROTEUS</h5></center></div>
            </div>
          </div>
        </div>

        <div className="col s7">
          <div className="card white">
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
            <div className="card-content black-text">
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