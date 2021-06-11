import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../services/authService';

//estudiar sobre react context API

// using a "provider" and a "consumer"
export const AuthContext = createContext();

export default ({ children }) => {

    const [user,setUser] = useState(null);
    const [extra,setExtra] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const [isLoaded,setIsLoaded] = useState(null);

    useEffect(() => {
        
        AuthService.isAuth().then(data => {
            setUser(data.user);
            //setExtra(data.extra);
            setIsAuth(data.isAuth);
            setIsLoaded(true); //para mostrar la pagina hasta que se halla cargado la info de usuario
        });
    },[]);

    return( // Todo este "contexto" le retorna ("provee") a React la informacion del usuario autorizado (y le hace saber que el usuario esta autorizado a realizar las respectivas acciones)
        <div>
            {!isLoaded ? <div className="se-pre-con"></div> : 
            <AuthContext.Provider value={{user,setUser,isAuth,setIsAuth}} >
                { children }        {/* children representa a un contenido/componente react que estara envuelto con la info de autorizacion */}
            </AuthContext.Provider>
            }
        </div>
    )

}