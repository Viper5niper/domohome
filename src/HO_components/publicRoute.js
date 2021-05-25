import React, {useContext} from 'react';
import {Route , Redirect} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

const PublicRoute = ({component : Component, ...rest}) => { //los componentes react deben iniciar con mayuscula

    const { isAuth } = useContext(AuthContext);

    return(
        <Route {...rest} render={ props => {
            if(isAuth) return <Redirect to={{ pathname : '/', state : { from : props.location}}}/>    //si el usuario no esta autorizado
      
            return <Component {...props}/>        
        }}/>
    )

}

export default PublicRoute;