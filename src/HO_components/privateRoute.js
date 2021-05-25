import React, {useContext} from 'react';
import {Route , Redirect} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

const PrivateRoute = ({component : Component, roles, ...rest}) => { //los componentes react deben iniciar con mayuscula

    const { isAuth , user } = useContext(AuthContext);

    return(
        <Route {...rest} render={ props => {
            if(!isAuth) return <Redirect to={{ pathname : '/Login', state : { from : props.location}}}/>    //si el usuario no esta autorizado
            if(!roles.includes(user.Type)) return <Redirect to={{ pathname : '/', state : { from : props.location}}}/>  //si el rol de usuario no esta autorizado
        
            return <Component {...props}/>
        
        }}/>
    )

}

export default PrivateRoute;