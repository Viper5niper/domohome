import Config from "./serverConfig";
const BU = Config.local;
const T = Config.token;

export default {


    get : ()=>{     //para obtener todos los estudiantes
        return fetch(`${BU}/vents`,
        { headers: {'Authorization': T } } )
        .then(res => {
            if(res.status === 401){ return {error : true, message : "inicia sesion para ver este contenido"}; }
            
            else {return res.json().then(data => data);}
        })
        
    },

    control : (vent,orden) => {
        return fetch(`${BU}/vents/${vent}/${orden}`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': T 
            }
        }).then(res => res.json())
        .then(data => data)
    },

    todas : (orden) => {
        return fetch(`${BU}/ventstodas/${orden}`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': T 
            }
        }).then(res => res.json())
        .then(data => data)
    },

    // programar : (luz,orden,time) => {
    //     return fetch(`${BU}/pluz/${luz}/${orden}`,{
    //         method : "POST",
    //         body : JSON.stringify({ hora : time}),
    //         headers : {
    //             'Content-Type' : 'application/json'
    //         }
    //     }).then(res => res.json())
    //     .then(data => data)
    // },




}