import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { LazyLog } from 'react-lazylog';

const AppLog = () => {

    //const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data)); 
      // }
    },[]);

      return(<div style={{ height: 500, width: '100%' }}>
            <LazyLog follow caseInsensitive extraLines={1} enableSearch
            url="https://bienvenido.xpertdt.xyz/public/index.php/getLog" />
      </div>)

}

export default AppLog;