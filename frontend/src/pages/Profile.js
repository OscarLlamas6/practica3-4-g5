import React, { Component } from 'react'
import '../css/Profile.css'
import Cookies from 'universal-cookie';
import MenuPrincipal from '../components/MenuPrincipal'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import md5 from 'md5';
import swal from 'sweetalert';
import { timers } from 'jquery';
import user from '../img/user.png';
import AnimalAvatar from 'animal-avatars.js'
import Tarjeta from '../components/Tarjeta';

const cookiess = new Cookies();
const Surl = "https://shrouded-coast-79182.herokuapp.com/nuevaPublicacion";
const TransUrl = "https://infinite-harbor-77648.herokuapp.com/nuevaTransaccion";
const SaldoUrl = "https://infinite-harbor-77648.herokuapp.com/consultarSaldo ";


let enBase64 = '';
let imagen = user;

export default class Profile extends Component {
    
    state={
        modalEditar: false,
        modalAlbum: false,
        modalSaldo: false,
        form:{
            descripcion: '',
            monto: '',
            destino: ''
        }, 
        saldo: 0,
        publicacionesT: [],
    };

    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }


    handleChange3=async e=>{
        e.persist();
        await this.setState({
            eliminar:{
                ...this.state.seleccionado,
                [e.target.name]: e.target.value
            }
        });
    }


    modaEditarEstado=()=>{
        this.setState({modalEditar: !this.state.modalEditar})
    }

    modalVerSaldo=()=>{
        this.setState({modalSaldo: !this.state.modalSaldo})
    }

    modaEditarAlbum=()=>{
        this.setState({modalAlbum: !this.state.modalAlbum})
    }

    componentDidMount(){
        if(!cookiess.get('cuenta')){
            window.location.href='./';
        }
        this.setState({
            saldo: cookiess.get("saldo")
        });
        //this.obtenerPublicaciones()
    }


    //REALIZAR TRASNFERENCIA
    RealizarTransferencia=async()=>{
        axios.post(TransUrl,{CuentaOrigen: cookiess.get("cuenta"), CuentaDestino: this.state.form.destino, monto: this.state.monto, descripcion: this.state.form.descripcion})
        .then(response=>{
            swal({
                title: "Transferencia",
                text: "Transferencia realizada.",
                icon: "success",
                button: "Aceptar",
                timer: "2000"
            });
            setTimeout('document.location.reload()',2000);  
        })
        .catch(error=>{
            console.error(error);
            swal({
                title: "Error",
                text: "Ha ocurrido un error.",
                icon: "error",
                button: "Aceptar"
            });
        })
    }

    //CONSULTAR SALDO
    consultarSaldo=async()=>{
        axios.post(SaldoUrl,{cuenta: cookiess.get("cuenta")})
        .then(response=>{
            console.log(response.data)
            cookiess.set('saldo', response.data.saldo, {path: "/"});
            this.setState({
                saldo: cookiess.get("saldo")
            });
        })
        .catch(error=>{
            console.error("error");
        })
    }

    //OBTENER TRANSACCIONES
    obtenerTransacciones=async()=>{
        axios.get("asdasd")
        .then(response=>{
            const pbl = response.data
            this.setState({
                publicacionesT: pbl
            });
        })
        .catch(error=>{
            console.error("error");
        })
    }
  

    render() {

        let cui = cookiess.get("CUI");
        let nombre = cookiess.get("nombre");
        let apellido = cookiess.get("apellido");
        let correo = cookiess.get("correo");
        let cuenta = cookiess.get("cuenta");
        let saldoN = this.state.saldo;

        return (
            <div>
                <>
                <MenuPrincipal/>
                </>
                <div className="salto"></div>
                <div className="container-lg">
                <div className="card text-center">
                    <div className="col1">
                        <div className="usuario">
                        <div class="container">
                            <div class="row">
                                <div class="col-8"><h3>{nombre} {apellido}</h3></div>
                                <div class="col-4"><h5>No. de Cuenta: {cuenta}</h5></div>
                            </div>
                        </div>                        
                        </div>

                        <div className="salto"> </div>

                        <div className="usuario">
                        <div class="container">
                            <div class="row">
                                <div class="col-8">
                                    <h4>Mis datos:</h4>
                                    <p><b>Nombre: </b>{nombre}</p>
                                    <p><b>Apellido: </b>{apellido}</p>
                                    <p><b>CUI: </b>{cui}</p>
                                    <p><b>Correo: </b>{correo}</p>
                                </div>
                                <div class="col-4">
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modaEditarEstado()}>Realizar Transferencia</button>
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modalVerSaldo()}>Consultar Saldo</button>
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modaEditarEstado()}>Generar Reporte</button>
                                </div>
                            </div>
                        </div>                        
                        </div>
                    </div>
                </div>
                </div>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader toggle={this.modaEditarEstado} style={{display: ''}}>
                    Realizar Transferencia
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                                <div className="col-12">
                                    <div>
                                        <h4>Cuenta Destino: </h4>
                                        <input  type="text" className="form-control" name="destino" id="destino" placeholder="No. Cuenta" onChange={this.handleChange}/>
                                        <div className="salto"></div>
                                        <h4>Monto: </h4>
                                        <input  type="number" className="form-control" name="monto" id="monto" placeholder="Q. " onChange={this.handleChange}/>
                                        <div className="salto"></div>
                                        <h4>Descripción: </h4>
                                        <textarea  type="text" className="form-control" name="descripcion" id="descripcion" placeholder="Descripción de la transferencia" onChange={this.handleChange}/>
                                    </div>
                            
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-info" onClick={this.RealizarTransferencia}>
                            Transferir
                        </button>
                        <button className="btn btn-dark" onClick={()=>this.modaEditarEstado()}>
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalSaldo}>
                    <ModalHeader toggle={this.modalVerSaldo} style={{display: ''}}>
                    Consultar Saldo
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col-md-auto">
                                    <img src="https://www.pngkey.com/png/full/9-97998_download-svg-download-png-billetes-con-alas.png" height="140px"></img>
                                    <h4>Tu saldo actual es:</h4>
                                    <h4>Q. {saldoN}</h4>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-info" onClick={this.consultarSaldo}>
                            Actualizar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}