import React, {useContext, useEffect} from 'react';
//import {Link} from 'react-router-dom';


import {AuthContext} from '../context/authContext';
import defaultGif from '../img/foco.gif';
import Luces from './homeSubComps/luces';
const LucesVen = () => {

    const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data));
      // }
    },[]);

    const componenteDeFuncion = () => {
      return(<span className="red-text">Soy un componente en una funcion del componente principal</span>)
    }

    const unAuthHome = () => {
        return(
            <div>
            
            <p>Has cerrado la sesion, aca quiero que vaya una pagina de bienvenida al usuario. Es decision tuya si queres hacer a parte el login o aca mismo. Recorda que por ahora solo importa el maquetado y no el funcionamiento, deja todo ordenado dentro de divs, y dividi las secciones en cards. Si queres volver a ver el inicio recarga la pagina, y para volver aca clickea el boton de cerrar sesion</p>

            </div>
        )
    }

    const AuthLuces = (tipo) => {
      return(<>
    <div className="row">
        <div className="col s12 m12 l12">
          <div className="card grey lighten-2">
            <div className="card-content black-text">
              <Luces/> {/*PD: YO LE QUISE PONER LUCES_CAMPERO AL COMPONENTE PERO SE FRESEAN*/}
            </div>
          </div>
        </div>
      </div>
      </>)
    }

    return(
     <div>
         { !isAuth ? unAuthHome() : AuthLuces(user.Type) }
     </div>   
    
)
}

export default LucesVen;