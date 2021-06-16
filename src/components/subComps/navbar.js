import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import defaultImg from '../../img/domotica.png'
import M from "materialize-css";


const NavBar = props => {

  const { user, extra } = useContext(AuthContext);

  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');  //inicializamos la navbar
    M.Sidenav.init(elems);
  }, []);

  const sideLogo = () => {
    return (
      <li>
        <div>
          <img  src={defaultImg} style={{ marginTop: '6%', marginLeft: '29%' }} width="35%" height="100%" />
        </div>
      </li>
    );
  }

  const sideLink = (props) => {
    return (<li><Link style={{ color: 'white' }} className="waves-effect" to={props.to}>
      <i style={{ color: 'white' }} className="small material-icons">{props.iconname}</i>
      {props.caption}</Link></li>);
  }

  const userNav = () => {
    return (
      <>
        {sideLogo()}
        <li>
          <div className="divider" />
        </li>
        {sideLink({ to: "/", iconname: "home", caption: "Inicio" })}
        {sideLink({ to: "/LucyVen", iconname: "tungsten", caption: "Luces y Ventilacion" })}
        {sideLink({ to: "/Sprinkler", iconname: "shower", caption: "Aspersores" })}
        {sideLink({ to: "/Security", iconname: "security", caption: "Seguridad" })}
        {sideLink({ to: "/LOG", iconname: "video_label", caption: "App Log" })}
      </>
    )
  }

  const renderSideNav = (tipo) => {
    switch (tipo) {
      case 'user':
        return userNav();
      default:
        return 'revisa el tipo recibido';
    }
  }

  return (
    <ul id="slide-out" className="sidenav indigo darken-1">
      { renderSideNav(user.Type)}
    </ul>
  )

}

export default NavBar;