import React, {useState,useContext} from 'react';
import AuthService from '../services/authService';
//import Message from './subComps/message';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

import InputItem from "./subComps/inputitem";//

//import defaultImg from '../img/error.png';

const Login = (props) => {

    const [user,setUser] = useState({username : "", password : ""});
    const [log,setlog] = useState(false);
    //const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onInputChange = e => {
        //console.log(user);
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onLoginSubmit = e => {
        e.preventDefault();
        
        AuthService.login(user).then( data => { //inicio de sesion
            const { error , /*message,*/ token, user } = data;
            //setMessage(message);
            console.log(data);
            
            if(!error){

                console.log(user);

                authContext.setUser(user);
                authContext.setIsAuth(true);
                props.history.push('/');

                localStorage.setItem('token', 'Bearer '+token); //guardamos para uso posterior
                //M.toast({html: 'Iniciaste sesion con exito!'}); no sirve ni verga
                //console.log("inicio de sesion exitoso");
            }
            else{
                setlog(true);
                setInterval(() => {
                    setlog(false);
                },5000)
                 console.log("error de sesion");} //setMessage(message);S
        });
    }

    const logueo = () => {
        return(
            <>
                <h4>INGRESAR</h4>
                <center>
                <div className="row">
                <InputItem name="username" caption="Usuario" onInputChange={onInputChange}
                iconname="account_circle" info="Ejemplo: AA18004 (estudiante), DOC-12345678-9 (docente)"/>
                </div></center>
                <center>
                <div className="row">
                <InputItem name="password" caption="Contraseña" onInputChange={onInputChange}
                iconname="https" info="Ejemplo: AA18004 (estudiante), DOC-12345678-9 (docente)"/>
                </div></center>
                <button className="btn waves-effect waves-light indigo darken-1" type="submit" name="action">Ingresar
                <i className="material-icons right">arrow_forward_ios</i></button>
                <div style={{display: '-webkit-inline-box'}}>
                </div>
                <br /><br />
                {/*<center><Link to="/recuperar">Olvide Mi Contraseña</Link></center>*/}
                <br />
                <center><Link to="/">Inicio</Link></center>
            </>
        )
    }

    const outlog = () => {
        return(
            <>
                <img src={""} alt="" width="230px" className="col s12 m12 l12"></img>
            </>
        )
    }

    return(
        <div className="pixelBG indigo darken-1">
        <form onSubmit={onLoginSubmit}>
        <center>
        <div className="row" id="container" style={{marginTop: '5%', marginLeft: '32%'}}>
            <div className="col s12 m6">
            <div className="card-panel lighten-2">
                {log ? outlog() : logueo()}
            </div>
            </div>
        </div>
        </center>
        </form>
        </div>
    )

}

export default Login;