import { useState } from "react";
import { useAutenticar } from '../contexto/autentContexto';
import { Link, useNavigate } from 'react-router-dom';
//import { async } from "@firebase/util";
import { Mensaje } from "./Mensaje";

export function Login() {

    const [usuario, setUsuario] = useState({
        email: "", //deben llamarse igual que el name del input
        password: "",
    });

    const { acceder, accedercongoogle, recuperaracceso } = useAutenticar()
    const navegador = useNavigate()
    const [mensaje, setMensaje] = useState();

    //const handleChange = (e) => { console.log(e.target.name,e.target.id);}
    const handleChange = ({ target: { name, value } }) => {
        setUsuario({ ...usuario, [name]: value })
        //console.log({...usuario});
    };

    const handleAccederConGoogle = async () => {
        setMensaje('')
        try {
            // Generar error throw new Error('Mensaje de error');
            await accedercongoogle()
            navegador('/')
        } catch (error) {
            setMensaje(error.message);
        }

    }

    const handleSubmit = async e => {
        //Cancelar en elvío para que no se refresque la página
        e.preventDefault()
        setMensaje('');
        //console.log(usuario);
        try {
            await acceder(usuario.email, usuario.password)
            //usar await y asunc cuando los componentes usen then y catch
            navegador('/')
        } catch (error) {
            //console.log(error.message);
            //console.log(error.code);
            // if (error.code === 'auth...') {}
            setMensaje(error.message);
        }
    }
    const handleResetearPassword = async () => {
        setMensaje('');
        if (!usuario.email) return setMensaje('Ingresa tu email');
        //console.log('reset pass'); // validar con el proveedor
        try {
            await recuperaracceso(usuario.email);
            setMensaje('Se envió un link a tu email para restablecer tu password');
        } catch (error) {
            setMensaje(error.message);
        }

    }


    return (
        <div className="bg-white-300 h-screen text-black flex "  >
            <div className="w-full max-w-xs m-auto">

                {mensaje && <Mensaje mensajeX={mensaje} />}

                <form onSubmit={handleSubmit} className="bg-gray-50 shadow-md rounded
             px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4">
                        <label htmlFor="email" className="block
                     text-gray-500 text-center mb-2">Sistema BETA v1.0</label>
                        <label htmlFor="email" className="block
                     text-gray-700 text-sm  mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="nombre@proveedor.com"
                            className="shadow appearance-none border rounded 
                        w-full py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline"
                            onChange={handleChange} />


                    </div>

                    <div className="mb-4">
                        <label typeof="password" className="block
                     text-gray-700 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="123456"
                            className="shadow appearance-none border rounded 
                        w-full py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline"
                            onChange={handleChange} />
                    </div>


                    <br></br>

                    <div className="flex items-center justify-between">
                        <button className="bg-green-500 hover:bg-green-700
                text-white text-sm font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline" >Acceder</button>

                        {/* <a href="#!" className="inline-block aling-baseline text-sm text-blue-500 
                hover:text-blue-800"
                        onClick={handleResetearPassword}>  Recuperar password</a> */}
                        <p className="inline-block aling-baseline text-sm text-blue-400 
                hover:text-blue-500"> <Link to='/recuperar'>Recuperar password</Link>

                        </p>
                    </div>


                </form>
                <p className="my-4 text-sm flex justify-between px-3">¿No tienes cuenta? <Link to='/registro'>Crear cuenta</Link>
                </p>
                <button onClick={handleAccederConGoogle}
                    className="bg-slate-50 hover:gb-slate-200 text-black text-sm
            shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">Login con Google</button>
                <p className="my-4 text-sm flex justify-between px-3 text-gray-400">
                    L.I. Omar Esteban | mx.esteban@outlook.com
                </p>

            </div>
        </div>
    )
}
