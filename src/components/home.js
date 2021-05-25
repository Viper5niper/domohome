import React, {useContext, useEffect} from 'react';
//import {Link} from 'react-router-dom';


import {AuthContext} from '../context/authContext';
//import defaultImg from '../img/default-photo.jpg';
import Componentesito from './homeSubComps/componentesito'

const Home = () => {

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

    const AuthHome = (tipo) => {
      return(<>
      <p>Bienvenido {user.Nombres}, como podes ver, la informacion del usuario en sesion esta en la variable "User" que se extrae del contexto asi como se muestra en la linea 10
      Este proyecto queda en tus manos. Podes comenzar cambiando los colores, en este caso ronald creo un color llamado "dark ues" en public/css/styles.css. Podes cambiarlo ahi o mejor crear uno y limpiar el monton de estilos
      que no se usaran. Para ver el codigo donde esta esto andate a "src/components/home" Te vas a fijar que hay unauth home y authhome, este codigo se basa en la variable "user.Type" para cargar uno u otro componente, por si se te
      ocurre meter tipos de usuarios ya tenes esa variable que la podes extraer usando el codigo de la linea 10. Por favor recorda esto siempre : cada "pantalla" o pagina debe tener su propio componente (ej, login, home), pero tambien podes dividir
      dicha pagina en varios componentes mas pequenios. podes crearlos desde una funcion como este: {componenteDeFuncion()} o podes crear uno a parte como este : <Componentesito/></p>
      <p>
        Borra todo lo que necesites, y cualquier duda hay andamos
      </p>
      </>)
    }

    return(
     <div>
         { !isAuth ? unAuthHome() : AuthHome(user.Type) }
     </div>   
    
)
}

export default Home;