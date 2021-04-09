# Manual Técnico
Análisis y Diseño de Sistemas 1

Grupo 5
---
Integrantes
|Carné | Nombre |
|:----:|:----:|
|201602625| Oscar Alfredo Llamas Lemus|
|201504051| Asunción Mariana Sic Sor|
|201601469| Oscar Eduardo Mazariegos López|
|201612383| Javier Antonio Álvarez González|
|201408549| Elba María Álvarez Domínguez|



## Tabla de Contenido
* [Diagrama de Arquitectura](#diagrama-de-arquitectura)
* [Casos de Prueba](#casos-de-prueba)
    * [BackEnd](#backend)
    * [FrontEnd](#frontend)
* [Anexos](#anexos)

## Diagrama de Arquitectura
En el siguiente diagrama se observa la arquitectura a utilizar para construir el software requerido.

![](img/arquitectura.png)

# Casos de Prueba

## **Backend**
<table>
<tr style="text-align:center;">
    <td>Descripción</td>
    <td>Prueba Unitaria</td>
</tr>
<tr>
<td style="text-align:center;">
Ingreso de sesión de un usuario a banca en línea con credenciales correctas. <br><br>
Para este caso, se espera un estado 202 que es el que da acceso a la plataforma.
</td>
<td>

  ```js
describe('login as a user: ',()=>{
    it('should login', (done) => {
        chai.request(app)
        .post('/login')
        .send({ cuenta: "37747947969500", password: "123456789"})
        .end( function(err,res){
            if (err){
                console.log(err);
            } else {
                console.log(res.body)
                expect(res).to.have.status(202);
                done();
            }
        });
    });
});
  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
Ingreso de sesión de un usuario a banca en línea con credenciales incorrectas. <br><br>
Para este caso, se espera un estado 404 que es el que niega el acceso a la plataforma.
</td>
<td>

  ```js
describe('login as a user: ',()=>{
    it(`Shouldn't login`, (done) => {
        chai.request(app)
        .post('/login')
        .send({ cuenta: "37747947969500", password: "123456781"})
        .end( function(err,res){
            if (err){
                console.log(err);
            } else {
                console.log(res.body)
                expect(res).to.have.status(404);
                done();
            }
        });
    });
});
  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
Este método se encarga de generar la fecha actual y devolver en tipo String. <br><br>
Dado el caso, la prueba unitaria comprueba que el tipo que devuelva sea el correcto.
</td>
<td>

  ```js
describe("testeando generarFecha: ", function() {
    describe("Validando fecha: ", function() {
        it("Check the returned value using: assert.equal(value,'value'): ", function() {
            result   = fecha.generarFecha();
            assert.typeOf(result, 'string');
        });
    });
});
  ```
</td>
</tr>
</table>

## **Frontend**
<table>
<tr style="text-align:center;">
    <td>Descripción</td>
    <td>Prueba Unitaria</td>
</tr>
<tr>
<td style="text-align:center;">
Compontes utilizados en las paginas. <br><br>
Todos los componentes deben de crearse correctamente.
</td>
<td>

  ```js
describe('Test para los componentes de la aplicación.', ()=>{
    it('Menu se Renderizá sin error', ()=>{
        const wrapper = shallow(<Menu/>);
        expect(wrapper).toHaveLength(1);
    })

    it('Menu Principal se Renderizá sin error', ()=>{
        const wrapper = shallow(<MenuPrincipal/>);
        expect(wrapper).toHaveLength(1);
    })

    it('Formulario Login se Renderizar sin error', ()=>{
        const wrapper = shallow(<FormLogin/>);
        expect(wrapper).toHaveLength(1);
    })

    it('Formulario Registro se Renderizá sin error', ()=>{
        const wrapper = shallow(<FormularioRegistro/>);
        expect(wrapper).toHaveLength(1);
    })

    it('Pdf se Renderizá sin error', ()=>{
        const wrapper = shallow(<PDF/>);
        expect(wrapper).toHaveLength(1);
    })
})

  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
Formularios en la pagina de login y registro. <br><br>
Los formularios deben de aparecer en el centro de la pagina
</td>
<td>

  ```js
describe('Formularios creados correctamente.', ()=>{
    it('Formulario Login debe centrar su contenido.', ()=>{
        expect(shallow(<FormLogin/>).is('.text-center')).toBe(true);
    })

    it('Formulario Registro debe centrar su contenido.', ()=>{
        expect(shallow(<FormularioRegistro/>).is('.text-center')).toBe(true);
    })
})
  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
El menu debera de contener el titulo correcto.
</td>
<td>

  ```js
describe('Debe aparecer el titulo de la pagina', ()=>{
    it('Debe tener el titulo analisis', () =>{
        expect(true);
        render(<Menu/>);

        expect(screen.queryByText(/analisis/i)).toBeInTheDocument();
    })
    it('Debe tener el titulo diseño', () =>{
        expect(true);
        render(<Menu/>);

        expect(screen.queryByText(/diseño/i)).toBeInTheDocument();
    })
});
  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
La pagina de perfil tiene que mostrar los datos correctos.
</td>
<td>

  ```js
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
  ```
</td>
</tr>

<tr>
<td style="text-align:center;">
El registro debe de mostrar los labels indicados y el boton para registrar.
</td>
<td>

  ```js
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
  ```
</td>
</tr>
<tr>
<td style="text-align:center;">
Debe de aparecer el label "no. de cuenta".
</td>
<td>

  ```js
describe('Pagina profile', ()=>{
    it('debe poder publicar', () =>{
        render(<Profile/>)
        // Debe tener label de datos
        expect(screen.queryByText(/no. de cuenta:/i)).toBeInTheDocument()
    })
});
  ```
</td>
</tr>
</table>

## Anexos
### Capturas de pantalla ###
### *Pagina de login* ###
![](img/login.png)
### *Pagina de registro* ###
![](img/registro.png)
### *Pagina de perfil* ###
![](img/perfil.png)
### *Ventana para consultar saldo.* ###
![](img/saldo.png)
### *Ventana para realizar transferencia.* ###
![](img/transferencia.png)
### *Ventana para generar reporte.* ###
![](img/reporte.png)


