import { useState } from "react";
import { useAutenticar } from '../contexto/autentContexto';
import { Link, useNavigate } from 'react-router-dom';
import { Mensaje,MensajeExito } from "./Mensaje";

export function Recuperar() {

    const [usuario, setUsuario] = useState({
        email: "", //deben llamarse igual que el name del input
        password: "",
    });

    const { recuperaracceso } = useAutenticar()
    const navegador = useNavigate()
    const [mensaje, setMensaje] = useState();
    const [mensajeexito, setMensajeexito] = useState();

    //const handleChange = (e) => { console.log(e.target.name,e.target.id);}
    const handleChange = ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value })
        //console.log({...usuario});
    };

    const handleSubmit = async e => {
        //Cancelar en elvío para que no se refresque la página
        e.preventDefault()
        setMensaje('');
        setMensajeexito('');
        if (!usuario.email) return setMensaje('Ingresa tu email');
        //console.log(usuario);
        try {
            await recuperaracceso(usuario.email);
            setMensajeexito('Mail enviado para restablecer tu password (revisa en Spam).');
        } catch (error) {
            //console.log(error.message);
            //console.log(error.code);
            // if (error.code === 'auth...') {}
            setMensaje(error.message);
        }
    }

  return (
    <div className="w-full max-w-xs m-auto">
            <div className="w-full max-w-xs m-auto">
            
            {mensaje && <Mensaje mensajeX={mensaje}/>}
            {mensajeexito && <MensajeExito mensajeX={mensajeexito}/>}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded
             px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <label htmlFor="email" className="block
                     text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="nombre@proveedor.com"
                        className="shadow appearance-none border rounded 
                        w-full py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline"
                        onChange={handleChange} />


                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-700
                text-white text-sm font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline" 
                >Reset Password</button>

                    {/* <a href="#!" className="inline-block aling-baseline text-sm text-blue-500 
                hover:text-blue-800"
                        onClick={handleResetearPassword}>Recuperar password</a> */}
                </div>


            </form>
            <p className="my-4 text-sm flex justify-between px-3">¿Ya recuperaste el password? <Link to='/login'>Iniciar Sesión</Link></p>

        </div>
    </div>
  )
}