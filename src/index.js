import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/authContext';

//ahora la "app" esta envuelta con el proveedor de autorizacion
ReactDOM.render(<AuthProvider> <App /> </AuthProvider>,document.getElementById('root'));

