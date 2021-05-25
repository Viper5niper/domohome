const Config = {//establecer "local" en el servidor deseado (ya sea localhost o api-tmngr)

    remote : "http://localhost/tmngr-api/public/index.php/",
    local : "https://api-tmngr.xpertdt.xyz/public/index.php/",
    token : localStorage.getItem('token')


};

export default Config;