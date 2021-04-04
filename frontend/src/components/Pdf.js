import React from 'react';
import Pdf from 'react-to-pdf';
import '../css/Publicaciones.css';
import Cookies from 'universal-cookie';

const cookiess = new Cookies();
const ReporteT = "https://infinite-harbor-77648.herokuapp.com/reporteTransaccion";
const ref = React.createRef();

const PDF = (props) =>{

    return(
        <>
            <div className="principal" ref={ref}> 
                <h2>Reporte de Transacciones</h2>
                <br></br>
                <h3>Creditos: </h3>
                {props.c}
                <h3>Debitos: </h3>
                {props.d}
            </div>
            <Pdf targetRef={ref} filename="Reporte.pdf">
                {({ toPdf }) => <button  className="btn btn-info" onClick={toPdf}>Guardar </button>}
            </Pdf>
        </>
    );
}

export default PDF;