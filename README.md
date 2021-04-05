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

## Casos de Prueba
### Backend
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

### Frontend
## Anexos
