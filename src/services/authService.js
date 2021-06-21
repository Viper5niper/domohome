import Config from "./serverConfig";
const emptyUsr = {Codigo : "", DUI : "", Carrera : "", NombreCompleto : "", DptName : "", Type : ""};
//const emptyUsr = {username : "", email : "", role : "", pfpuri : ""};

const baseUrl = Config.local;

export default {

    login : user => {
        return fetch(baseUrl + '/users/login',
        {
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            
            return res.json().then(data => {
                if(data.error){return { error : true , message : data.message, user : emptyUsr};}
                else return data;
            });
        })
    },

    logout : ()=>{
        localStorage.setItem('token','invalid'); //una token invalida en vez de eliminarla
        return emptyUsr;
        /*return fetch(baseUrl + '/usuarios/logout').then(res => res.json())
        .then(data => data)*/
    },

    isAuth : async ()=> {
        return fetch(baseUrl + 'checkAuth',  //siempre se comprobara la token en el server
        {
            headers: {
            'Authorization': localStorage.getItem('token')
        }})
        .then(res =>{
            //console.log("status : " + res.status);
            if(res.status === 401){return { isAuth : false , user : emptyUsr};}

            else{ return res.json().then(data => data);}
        })/**/
    }

    /*
      return {
                user: {
                    Codigo : "ELPP",
                    Nombres : "Pepe tonio celedonio",
                    Type : "user"
                },
                extra: {

                },
                isAuth : true
            }
        
            */


}