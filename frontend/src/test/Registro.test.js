import React from 'react'
import { screen, render } from '@testing-library/react'
import Registro from '../pages/Registro'

describe('Pagina registro', ()=>{
    it('debe de pedir nombre', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/nombre/i)).toBeInTheDocument()
    })

    it('debe tener textbox de nombre', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'textbox', 
                { name: /nombre/i }
            )
       ).toBeInTheDocument();
    })

    it('debe de pedir apellido', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/apellido/i)).toBeInTheDocument()
    })

    it('debe tener textbox de apellido', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'textbox', 
                { name: /nombre/i }
            )
       ).toBeInTheDocument();
    })

    it('debe de pedir cui', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/cui/i)).toBeInTheDocument()
    })

    it('debe tener textbox de cui', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'spinbutton', 
                { name: /cui/i }
            )
       ).toBeInTheDocument();
    })

    it('debe de pedir saldo', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/saldo/i)).toBeInTheDocument()
    })

    it('debe tener textbox de saldo', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'spinbutton', 
                { name: /saldo/i }
            )
       ).toBeInTheDocument();
    })

    it('debe de pedir correo', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/correo/i)).toBeInTheDocument()
    })

    it('debe tener textbox de correo', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'textbox', 
                { name: /correo/i }
            )
       ).toBeInTheDocument();
    })

    it('debe de pedir password', () =>{
        render(<Registro/>)
        // Debe tener label de datos
        expect(screen.queryByText(/password/i)).toBeInTheDocument()
    })

    it('Debe tener boton de registro', () =>{
        render(<Registro/>)

        expect(
            screen.getByRole(
                'button', 
                {
                    name: /registrarse/i
                }
            )
        ).toBeInTheDocument();
    })

});