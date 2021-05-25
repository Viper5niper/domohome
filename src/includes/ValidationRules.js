const emptyUsr = {Codigo : "", DUI : "", Carrera : "", NombreCompleto : "", DptName : ""};
//const emptyUsr = {username : "", email : "", role : "", pfpuri : ""};

const baseUrl = "http://localhost/Personal/tmngr-api/public";

const carr = {

    Departamentos :  [
        {id:1, name : "Departamento de Ingenieria y arquitectura", imgUrl : ""},
        {id:2, name : "Departamento de Ciencias Economicas", imgUrl : ""}

    ],

    Carreras : [
            [                   //ID 0
                {id: "Arquitectura", name : "Arquitectura"},
                {id: "Ingeniería Civil", name : "Ing. Civil"},
                {id: "Ingeniería Industrial", name : "Ing. Industrial"},
                {id: "Ingeniería Mecánica", name : "Ing. Mecánica"},
                {id: "Ingeniería Eléctrica", name : "Ing. Eléctrica"},
                {id: "Ingeniería en Sistemas Informáticos", name : "Ing. en Sistemas Informáticos"}
            ],
            [                   //ID 1
                {id: "Licenciatura en Contabilidad", name : "Lic. en Contabilidad"},
                {id: "Licenciatura en Administracion de Empresas", name : "Lic. en Admin. de Empresas"},
                {id: "Ingeniería Industrial", name : "Ingeniería Industrial"},
                {id: "Ingeniería Mecánica", name : "Ingeniería Mecánica"},
                {id: "Ingeniería Eléctrica", name : "Ingeniería Eléctrica"},
                {id: "Ingeniería en Sistemas Informáticos", name : "Ingeniería en Sistemas Informáticos"}
            ]
        ]
       


};

let Deps = carr.Departamentos;
let Carrs = carr.Carreras;

export { Deps as Departamentos, Carrs as Carreras};