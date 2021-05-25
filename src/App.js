import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

/* -------- componentes de orden mayor ---------- */
//import PrivateRoute from './HO_components/privateRoute';
import PublicRoute from './HO_components/publicRoute';

import {AuthContext} from './context/authContext';

/* ---- sub componentes --------*/
import TopBar from './components/subComps/topbar';
import NavBar from './components/subComps/navbar';

/* ------ inicio ------ */
import Home from './components/home';// aca se encuentran los 4 inicios
import Login from './components/login';

//import InfoUser from './components/global/infoUser';

/** checkpoint: Utilizamos React context para conocer el estado de las diferentes cosas
 * utilizamos React Router para cargar componentes cuando se quiere acceder a x ruta,
 * Todos los componentes estan en la carpeta components. Debemos poner todos los componentes en contexto haciendo uso de "context"
 * el contexto de la aplicacion se da en base a los servicios que se obtienen de la api (usuario logueado, tema/colores del programa, etc)
 */

function App() {

  const {isAuth} = useContext(AuthContext);

  return (  // roles: "admin" "coord" "docente" "estudiante"
    <Router>
      {isAuth ? <TopBar/> : null}
      {isAuth ? <NavBar/> : null}

      {/* ---- Inicio ------ */}
      <Route exact path="/" component={Home}/>
      <PublicRoute path="/Login" component={Login}/>

      <Redirect to="/"/> {/* para redireccionar cualquier otra ruta a la pagina de inicio*/}
      
    </Router>
  );
}

export default App;

  /*
  const menuButton = () => {  //boton flotante, puede servir luego
  return (      
  <div className="fixed-action-btn" style={{right: 'auto', marginLeft: '3%'}}>
    <a className="btn-floating waves-light btn-large ues sidenav-trigger" data-target="slide-out">
      <i className="large material-icons">mode_edit</i>
    </a>
  </div>
  );
  }*/