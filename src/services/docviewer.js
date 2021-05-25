import Config from "./serverConfig";
const BU = Config.local;
//const T = Config.token;

const getGviewUrl = (url) => {
    return `https://docs.google.com/gview?url=${url}`;//agregar "&embeded=true" para embed
}

//Tenemos el visor microsoft
const getMSviewUrl = (url) => {
    return `https://view.officeapps.live.com/op/view.aspx?src=${url}`; //cambiar view por embed para embed
}

export default {

    postFile : (nombre,dir,input) => {

        var fData = new FormData();

        fData.append("archivo", input.files[0]);

        fData.append("nombre", nombre);
        fData.append("ruta", dir);

        return fetch(`${BU}/archivos/postFile`,{
            method : "POST",
            body : fData
        }).then(res => res.json())
        .then(data => data)

    },

    getFullScreenView : (LL,N) => {
        //OJOOOOOO REEMPLAZAR LOS & CON %26 PARA QUE PODAMOS OBTENER EL ARCHIVO AUN PASANDO LOS PARAMETROS URL
        let url = `${BU}/archivos/getFile?llave=${LL}%26nombre=${N}`;
        let view = getGviewUrl(url);
        window.open(view, "_blank");
    },
    downloadFile : (LL,N) => {
        let url = `${BU}archivos/getFile?llave=${LL}&nombre=${N}`;
        window.open(url, "_blank");
    },
    deleteFile : (LL,N) => {   //para eliminar un estudiante CONFIRMADO
        return fetch(`${BU}archivos/deleteFile?llave=${LL}&nombre=${N}`,{
            method : "DELETE"
        }).then(res => {
            if(res.status === 401){ return { error : true , message : "No autorizado"};}
            
            else{ return res.json().then(data => data);}
        })
    },

    aproveFile : (LL,N) => {   //para eliminar un estudiante CONFIRMADO
        return fetch(`${BU}archivos/aproveFile?llave=${LL}&nombre=${N}`)
        .then(res => {
            if(res.status === 401){ return { error : true , message : "No autorizado"};}
            
            else{ return res.json().then(data => data);}
        })
    },

    scanRoute : (LL,N) => {   //para eliminar un estudiante CONFIRMADO
        return fetch(`${BU}archivos/aproveFile?llave=${LL}&nombre=${N}`)
        .then(res => {
            if(res.status === 401){ return { error : true , message : "No autorizado"};}
            
            else{ return res.json().then(data => data);}
        })
    },

}

//export default DocViewer;