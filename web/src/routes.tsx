import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Logout from './pages/Logout';


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Landing } />
            <Route path="/cadastro" component={ Cadastro } />
            <Route path="/login" component={ Login } />
            <Route path="/logout" component={ Logout } />
        </BrowserRouter>
    )
}
export default Routes;