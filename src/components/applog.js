import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/authContext';
import { LazyLog } from 'react-lazylog';
const AppLog = () => {

    const {user,isAuth} = useContext(AuthContext);


    useEffect(() => {
      // if(isAuth){
      //   adminService.get().then(data => console.log(data));
      // }
    },[]);



      return(<>
      <div >
        
            <LazyLog url="./app.log"/>

      </div>
      </>)



}

export default AppLog;