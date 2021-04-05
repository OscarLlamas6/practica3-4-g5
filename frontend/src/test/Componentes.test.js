import { shallow } from 'enzyme';
import Menu from '../components/Menu';
import MenuPrincipal from '../components/MenuPrincipal';
import FormLogin from '../components/FormLogin';
import FormularioRegistro from '../components/FormularioRegistro';
import PDF from '../components/Pdf';


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

describe('Formularios creados correctamente.', ()=>{
    it('Formulario Login debe centrar su contenido.', ()=>{
        expect(shallow(<FormLogin/>).is('.text-center')).toBe(true);
    })

    it('Formulario Registro debe centrar su contenido.', ()=>{
        expect(shallow(<FormularioRegistro/>).is('.text-center')).toBe(true);
    })
})

