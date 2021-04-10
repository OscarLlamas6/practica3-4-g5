import React from 'react'
import { screen, render } from '@testing-library/react'
import Profile from '../pages/Profile'

describe('Pagina profile', ()=>{
    it('debe poder publicar', () =>{
        render(<Profile/>)
        // Debe tener label de datos
        expect(screen.queryByText(/no. de cuenta:/i)).toBeInTheDocument()
    })
});