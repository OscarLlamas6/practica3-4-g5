import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import user from '../img/user.png';
import swal from 'sweetalert';

const url = "https://infinite-harbor-77648.herokuapp.com/nuevoUsuario";

const cookies = new Cookies();
let enBase64 = '';
let imagen = user;
let ext = '';
let FechaHora = '';

export default class FormularioRegistro extends Component{

   // constructor(){
     //   super();
        //this.
        state = {
            name: '',
            lastName: '',
            CUI: '',
            saldo: 0,
            correo: '',
            password: ''
        }
    //}

    // Retorna false y muestra un swal informando que datos estan erroneos/incompletos. 
    // Retorna true si los datos son validos
    ComprobacionYMensaje(){
        if(this.state.name == ''  || this.state.lastName == '' || this.state.CUI == '' || this.state.saldo == 0 || this.state.correo == '' || this.state.password == ''){
            swal({
                title: "Error",
                text: "Llenar todos los campos",
                icon: "error",
                button: "Aceptar"
            });
            return false;
        }
        
        return true;
    }

    render(){
        
        return(
            
            <div className="modal-dialog text-center">
            <div className="col-sm-8 cuadro-central">
                <div className="modal-content">
                    <form onSubmit={this._handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="uNombre" className="form-label">Nombre</label>
                            <input onChange={e => this.setState({name: e.target.value})} type="text" className="form-control" id="uNombre" placeholder="Nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uApellido" className="form-label">Apellido</label>
                            <input onChange={e => this.setState({lastName: e.target.value})} type="text" className="form-control" id="uApellido" placeholder="Apellido" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uCUI" className="form-label">CUI</label>
                            <input onChange={e => this.setState({CUI: e.target.value})} type="number" className="form-control" id="uCUI" placeholder="CUI"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usaldo" className="form-label">saldo</label>
                            <input onChange={e => this.setState({saldo: e.target.value})} type="number" className="form-control" id="usaldo" placeholder="Saldo inicial de cuenta"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ucorreo" className="form-label">correo</label>
                            <input onChange={e => this.setState({correo: e.target.value})} type="text" className="form-control" id="ucorreo" placeholder="Correo electrónico"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="uPassword" className="form-label">password</label>
                            <input onChange={e => this.setState({password: e.target.value})} type="password" className="form-control" id="uPassword" placeholder="Contraseña"/>
                        </div>
                        <button type="submit" className="btn btn-dark">Registrarse</button>
                    </form>
                        <a href="/">¿Ya tienes una cuenta? Logueate aquí</a>
                    <div>
                        <br></br>
                    </div>
                    </div>
            </div>
        </div>
        );

    }

    _handleSubmit = async(e) =>{
        e.preventDefault();
        console.log('oprimio registarse');

        if(this.ComprobacionYMensaje()){
            console.log('registro')

            // Registrar usuario
                let existe = 0;
                console.log(this.state)
                if(existe == 0){
                    axios.post(url, {nombre: this.state.name, apellido: this.state.lastName, CUI: this.state.CUI, saldo: this.state.saldo, correo: this.state.correo, password: this.state.password})
                    .then(response=>{
                        console.log('response: ');
                        console.log(response.data);
                        if(response.status >= 400){
                            console.log("error al registrarse");
                            swal({
                                title: "Error",
                                text: "Error al registrarse",
                                icon: "error",
                                button: "Aceptar"
                            });
                        }else if(response.status == 202){   
                            console.log("El usuario fue registrado");
                            swal({
                                title: "Registrado",
                                text: "Registrado correctamente, su número de cuenta es el: "+response.data.cuenta,
                                icon: "success",
                                button: "Aceptar"
                            })
                            .then((value) => {
                                window.location.href="./"
                                //swal(`The returned value is: ${value}`);
                            });
                        }
                    })
                    .catch(error=>{
                        console.log("ERROR")
                    })
                }else{
                    swal({
                        title: "Error",
                        text: "La cuenta con este CUI ya esta creada",
                        icon: "error",
                        button: "Aceptar"
                    });
                    console.log('La cuenta ya existe');
                }
            
        }
    }

    
    
}