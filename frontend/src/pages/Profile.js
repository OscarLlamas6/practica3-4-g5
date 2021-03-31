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
const Purl = "https://shrouded-coast-79182.herokuapp.com/getPublicaciones";


let enBase64 = '';
let imagen = user;

export default class Profile extends Component {
    
    state={
        data:[],
        modalEditar: false,
        modalAlbum: false,
        modalSaldo: false,
        form:{
            userName: '',
            publi: '',
            image: ''
        }, 
        album:{
        crearAlbum: '',
        },
        publicacionesT: [],
        miFoto: ''
    };

    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    handleChange2=async e=>{
        e.persist();
        await this.setState({
            album:{
                ...this.state.album,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.album);
    }

    handleChange3=async e=>{
        e.persist();
        await this.setState({
            eliminar:{
                ...this.state.seleccionado,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.eliminar.seleccionado);
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
        if(!cookiess.get('username')){
            //window.location.href='./';
        }
        //this.obtenerPublicaciones()
    }


    //EDITAR PERFIL
    PublicarEstado=async()=>{
        console.log(cookiess.get("nombre"))
        console.log(cookiess.get("apellido"))
        console.log(cookiess.get("username"))
        console.log(this.state.form.publi)
        console.log(enBase64)
        axios.post(Surl,{username: cookiess.get("username"), nombre: cookiess.get("nombre"), apellido: cookiess.get("apellido"), contenido: this.state.form.publi, image: enBase64})
        .then(response=>{
            swal({
                title: "Publicacíon",
                text: "Se creo la publicación correctamente.",
                icon: "success",
                button: "Aceptar",
                timer: "2000"
            });
            setTimeout('document.location.reload()',2000);  
        })
        .catch(error=>{
            console.error("error");
            swal({
                title: "Error",
                text: "Ha ocurrido un error.",
                icon: "error",
                button: "Aceptar"
            });
        })
    }

    obtenerPublicaciones=async()=>{
        axios.get(Purl)
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

        let usuario = cookiess.get("username");
        let nombre = cookiess.get("nombre");
        let apellido = cookiess.get("apellido");
        let foto = cookiess.get("image")

        const convertirBase64=(archivos)=>{
            Array.from(archivos).forEach(archivo=>{
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload=function(){
                    var aux=[];
                    var base64 = reader.result;
                    imagen = base64;
                    aux = base64.split(',');
                    enBase64 = aux[1];
                    var aux2, aux3 = [];
                    aux2 =aux[0].split('/');
                    aux3 = aux2[1].split(';');
                }
            })
        }


        var pp = this.state.publicacionesT.map(tarjeta => {
            return (
            <div key={tarjeta.id}>
                <Tarjeta usuario={tarjeta.username} imagenPublicacion={tarjeta.image} contenido={tarjeta.contenido} fecha={tarjeta.fecha}/>
            </div>
            )
        });

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
                                <div class="col-8"><h3>Oscar Mazariegos</h3></div>
                                <div class="col-4"><h5>No. de Cuenta: 37747947969500</h5></div>
                            </div>
                        </div>                        
                        </div>

                        <div className="salto"> </div>

                        <div className="usuario">
                        <div class="container">
                            <div class="row">
                                <div class="col-8">
                                    <h4>Mis datos:</h4>
                                    <p>Oscar Eduardo</p>
                                    <p>Mazariegos Lópes</p>
                                    <p>2871335160101</p>
                                    <p>oscarmazariegos@gmail.com</p>
                                </div>
                                <div class="col-4">
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modaEditarEstado()}>Realizar Transferencia</button>
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modalVerSaldo()}>Consultar Saldo</button>
                                    <div className="salto2"></div>
                                    <button type="button" className="btn btn-dark btn-lg btni" onClick={()=>this.modaEditarEstado()}>Reporte</button>
                                </div>
                            </div>
                        </div>                        
                        </div>
                    </div>
                </div>
                </div>


                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader toggle={this.modaEditarEstado} style={{display: ''}}>
                    Crear Publicación
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="userNombre">Publicación</label>
                                        <textarea className="form-control" rows="5" name="publi" id="publi" placeholder="¿En que estas pensando?..." cols="52" onChange={this.handleChange}></textarea>
                                        <br></br>
                                        <input type="file"  accept="image/png, image/jpeg" multiple onChange={(e)=>convertirBase64(e.target.files)}></input>   
                                    </div>
                            </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-info" onClick={this.PublicarEstado}>
                            Publicar
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
                                    <h4>Q. 12,000.00</h4>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-info" onClick={this.PublicarEstado}>
                            Consultar
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}