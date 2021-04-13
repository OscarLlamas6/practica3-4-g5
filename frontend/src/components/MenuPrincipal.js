import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookiess = new Cookies();

export default class MenuPrincipal extends Component {
    state = {
        isOpen: false
      };
    
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    CerrarSesion=()=>{

        cookiess.remove('CUI', {path: "/"});
        cookiess.remove('nombre', {path: "/"});
        cookiess.remove('apellido', {path: "/"});
        cookiess.remove('saldo', {path: "/"});
        cookiess.remove('password', {path: "/"});
        cookiess.remove('correo', {path: "/"});
        cookiess.remove('cuenta', {path: "/"});
        window.location.href='./';
    }

    render(){
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">
            <img src="https://cdn.worldvectorlogo.com/logos/strapi-2.svg" alt="" width="30" height="30" className="d-inline-block align-top"/>
            ANALISIS Y DISEÑO 1
        </a>
        <div className="dropdown" onClick={this.toggleOpen}>
	    <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            >
            Opcion
	    </button>
        <div>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="./profile">
                Mi perfil
            </a>
            <a className="dropdown-item" href="#" onClick={()=>this.CerrarSesion()}>
                Cerrar Sesion
            </a>
        </div>
        </div>
        </div>
        </div>
        </nav>
        )
    }
}
