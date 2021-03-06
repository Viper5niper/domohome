import Config from "./serverConfig";
const BU = Config.dinamic;
const T = Config.token;

export default {


    get : ()=>{     //para obtener todos los estudiantes
        return fetch(`${BU}/asp`,
        { headers: {'Authorization': T } } )
        .then(res => {
            if(res.status === 401){ return {error : true, message : "inicia sesion para ver este contenido"}; }
            
            else {return res.json().then(data => data);}
        })
        
    },

    control : (asp,orden) => {
        return fetch(`${BU}/asp/${asp}/${orden}`,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': T 
            }
        }).then(res => res.json())
        .then(data => data)
    },

    programar : (asp,orden,time) => {
        return fetch(`${BU}/pasp/${asp}/${orden}`,{
            method : "POST",
            body : JSON.stringify({ hora : time}),
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