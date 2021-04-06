import React from 'react'
import { screen, render } from '@testing-library/react'
import Profile from '../pages/Profile'

describe('Pagina profile', ()=>{
    it('debe mostrar texto: mis datos', () =>{
        render(<Profile/>)
        // Debe tener label de datos
        expect(screen.queryByText(/mis datos/i)).toBeInTheDocument()
    })

    it('Debe tener boton transferencia', () =>{
        render(<Profile/>)

        expect(
            screen.getByRole(
                'button', 
                {
                    name: /realizar transferencia/i
                }
            )
        ).toBeInTheDocument();
    })

    it('Debe tener boton saldo', () =>{
        render(<Profile/>)

        expect(
            screen.getByRole(
                'button', 
                {
                    name: /saldo/i
                }
            )
        ).toBeInTheDocument();
    })

    it('Debe tener boton reporte', () =>{
        render(<Profile/>)

        expect(
            screen.getByRole(
                'button', 
                {
                    name: /generar reporte/i
                }
            )
        ).toBeInTheDocument();
    })

    it('Debe mostart nombre', () =>{
        let a = render(<Profile/>)
        // /expresion regular/ i -> ignore case 
        expect(screen.queryByText(/nombre/i)).toBeInTheDocument()
    })

    it('Debe mostart apellido', () =>{
        let a = render(<Profile/>)
        // /expresion regular/ i -> ignore case 
        expect(screen.queryByText(/apellido/i)).toBeInTheDocument()
    })

    it('Debe mostart cui', () =>{
        let a = render(<Profile/>)
        // /expresion regular/ i -> ignore case 
        expect(screen.queryByText(/cui/i)).toBeInTheDocument()
    })

    it('Debe mostart correo', () =>{
        let a = render(<Profile/>)
        // /expresion regular/ i -> ignore case 
        expect(screen.queryByText(/correo/i)).toBeInTheDocument()
    })
});