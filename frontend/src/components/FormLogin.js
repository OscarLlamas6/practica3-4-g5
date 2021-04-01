import React, { Component } from 'react';
import user1 from '../img/user.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const Surl ="https://infinite-harbor-77648.herokuapp.com/login";
const cookiess = new Cookies();

export default class FormLogin extends Component {
    //creamos constructor 
    constructor(){
        //hereda los componentes de react
        super();
        this.state = {
            cuenta: '',
            password: ''
        }
    }


    componentDidMount(){
        if(cookiess.get('cuenta')){
            window.location.href='./profile';
        }
    }

    prueba=async()=>{
        axios.get(Surl)
        .then(response=>{
            console.log(response.data)
        })
        .catch(error=>{
            console.error(error)
        })
    }

    IniciarSesion=async()=>{
        axios.post(Surl, {cuenta: this.state.cuenta, password: this.state.password})
        .then(response=>{
            console.log(response.data)
            if(response.status != 202){
                swal({
                    title: "Error",
                    text: "Error al iniciar sesion.",
                    icon: "info",
                    button: "Aceptar",
                });
            }else{
                let cEntra = response.data.password;
                let contraL = this.state.password;
                if(cEntra != contraL){
                    swal({
                        title: "Error",
                        text: "No. de Cuenta/Contraseña incorrectos.",
                        icon: "error",
                        button: "Aceptar"
                    });
                }else{
                    console.log("Credenciales correctas.");
                    console.log(response.data);
                    //variable de sesion con universal cookies.
                    var usuario = response.data;
                    cookiess.set('CUI', usuario.CUI, {path: "/"});
                    cookiess.set('nombre', usuario.nombre, {path: "/"});
                    cookiess.set('apellido', usuario.apellido, {path: "/"});
                    cookiess.set('saldo', usuario.saldo, {path: "/"});
                    cookiess.set('password', usuario.password, {path: "/"});
                    cookiess.set('correo', usuario.correo, {path: "/"});
                    cookiess.set('cuenta', usuario.cuenta, {path: "/"});
                    swal({
                        title: "Bienvenid@",
                        text: ":) Credenciales correctas.",
                        icon: "success",
                        button: "Aceptar"
                    });
                    setTimeout("location.href='./profile'", 2000);
                    //alert(`Bienvenido ${usuario.nombre} de nuevo.`);
                    //window.location.href="./profile"
                }
            }
        })
        .catch(error=>{
            console.error(error)
            /*swal({
                title: "Ocurrio algo",
                text: "No existe el usuario.",
                icon: "error",
                button: "Aceptar"
            });*/
            //setTimeout("location.href='./'", 2000);
        })
    }


    //hago el submit y obtengo los datos metiendolos en el state
    _handleSubmit = (e) =>{
        e.preventDefault()
        //this.prueba();
        this.IniciarSesion()
    }


    /*
        var datos = this.state.personas.map((p,i) =>{
            return <li key={i} >{ p.nombre }</li>
        });
    */

    render(){

        return(
            
            <div className="modal-dialog text-center">
            <div className="col-sm-8 cuadro-central">
                <div className="modal-content">
                    <div className="col-12 user-img">
                        <img alt="userDefault" src={user1}></img>
                    </div>
                    <form onSubmit={this._handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="uUsuario" className="form-label">Usuario</label>
                            <input onChange={e => this.setState({cuenta: e.target.value})} type="text" className="form-control" id="cuenta" placeholder="No. de Cuenta" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uContra" className="form-label">Contraseña</label>
                            <input onChange={e => this.setState({password: e.target.value})} type="password" className="form-control" id="password" placeholder="Contraseña"/>
                        </div>
                        <button type="submit" className="btn btn-dark">Iniciar Sesión</button>
                        </form>
                        <a href="/register">Registrate ahora</a>
                    <div>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
