import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { LazyLog } from 'react-lazylog';

import Config from "../services/serverConfig";

const AppLog = () => {

    //const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data)); 
      // }
    },[]);

      return(<div style={{ height: 500, width: '100%' }}>
            <LazyLog follow caseInsensitive extraLines={1} enableSearch
            url={Config.local + "getLog"} />
      </div>)

}

export default AppLog;