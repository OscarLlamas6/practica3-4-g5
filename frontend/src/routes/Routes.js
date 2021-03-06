import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
//importamos nuestras pagias
import Login from '../pages/Login'
import Profile from '../pages/Profile';
import Registo from '../pages/Registro';


//rutas creadas LOGIN
//ruta de prueba app
function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/register" component={Registo}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;