import Config from "./serverConfig";
const BU = Config.dinamic;
const T = Config.token;

export default {

    postEstudiante : (data,fileInputs) => {

        var fData = new FormData();

        //adjuntamos todos los archivos
        fileInputs.map( input => {
            fData.append(input.name, input.files[0]);
        });

        //agregamos todas las propiedades del estudiante
        Object.keys(data).forEach(function(key) {
            fData.append(key, data[key]);
          });

        return fetch(`${BU}/usuarios/registrar`,{
            method : "POST",
            body : fData
        }).then(res => res.json())
        .then(data => data)
    },


    get : ()=>{     //para obtener todos los estudiantes
        return fetch(`${BU}/usuarios`,
        { headers: {'Authorization': T } } )
        .then(res => {
            if(res.status === 401){ return {error : true, message : "inicia sesion para ver este contenido"}; }
            
            else {return res.json().then(data => data);}
        })
        
    },

    post : user => {
        return fetch(`${BU}/usuarios/registrar`,{
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(data => data)
    },

    put : (user,ID) => {
        return fetch(`${BU}usuarios/${ID}`,{
            method : "PUT",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': T
            }
        }).then(res => res.json())
        .then(data => data)
    },

    // search : (ID)=>{ 
    //     return fetch(`${BU}/usuarios/${ID}`,
    //     { headers: {'Authorization': T } } )
    //     .then(res => {
    //         if(res.status === 401){ return {error : true, message : "inicia sesion para ver este contenido"}; }
            
    //         else {return res.json().then(data => data);}
    //     })
        
    // },

    delete : ID => {    //para eliminar un usuario. Esta funcion esta duplicada en los servicios docente y estudiante
        return fetch(`${BU}/usuarios/${ID}`,{
            method : "DELETE",
            headers: {'Authorization': T }
        }).then(res => {
            if(res.status === 401){ return { error : true , message : "No autorizado"};}
            
            else{ return res.json().then(data => data);}
        })
    }

}