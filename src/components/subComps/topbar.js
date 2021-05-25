import React, {useContext, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';
import { AuthContext } from '../../context/authContext';

import M from "materialize-css";


const TopBar = props => {
    
    const {setIsAuth,setUser} = useContext(AuthContext);

    useEffect(() => {
      var elems = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(elems);
  },[]);

    const logoutHandler = () => {
        
        let empty = AuthService.logout();
        setUser(empty);
        setIsAuth(false);
        //props.history.push('/');

        /*AuthService.logout().then(data => {
            if(!data.error){
                setUser(data.user);
                setIsAuth(false);
                props.history.push('/');
            }
        }) */
    }

    const logoutButton = () => {

      return (
      <li><a href="#!" style={{color: 'white'}} className="waves-effect"
      data-tooltip="Cerrar Sesion"><i style={{color: 'white'}} 
      onClick={logoutHandler} className="material-icons">exit_to_app</i></a></li>
      );
  
      }

    return(
      <header>
      <nav>
        <div className="nav-wrapper ues">
          <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
          <div className="hide-on-med-and-down">
            <a href="#!" className="brand-logo center">UES-FMO Tesis Manager</a>
          </div>
          <ul className="right">
            <li><a href="#!" id="dark_mode">
                <i style={{color: 'white'}} className="small material-icons">wb_sunny</i>
              </a></li>
            <li><a href="#!" id="helpBtn">
                <i style={{color: 'white'}} className="small material-icons">help_outline</i>
              </a></li>
            {logoutButton()}
          </ul>
        </div>
      </nav></header>
    )

}

export default TopBar;