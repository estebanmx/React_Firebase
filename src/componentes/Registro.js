import { useState } from "react";
import { useAutenticar } from '../contexto/autentContexto';
import { Link, useNavigate } from 'react-router-dom';
//import { async } from "@firebase/util";
import { Mensaje } from "./Mensaje";

export function Registro() {

  const [usuario, setUsuario] = useState({
    email: "", //deben llamarse igual que el name del input
    password: "",
  });

  const { registrar } = useAutenticar()
  const navegador = useNavigate()
  const [mensaje, setMensaje] = useState();

  //const handleChange = (e) => { console.log(e.target.name,e.target.id);}
  const handleChange = ({ target: { name, value } }) => {
    setUsuario({ ...usuario, [name]: value })
    //console.log({...usuario});
  };

  const handleSubmit = async e => {
    //Cancelar el envío para que no se refresque la página
    e.preventDefault()
    setMensaje('');
    //console.log(usuario);
    try {
      await registrar(usuario.email, usuario.password)
      //usar await y asunc cuando los componentes usen then y catch
      navegador('/')
    } catch (error) {
      //console.log(error.message);
      //console.log(error.code);
      // if (error.code === 'auth...') {}
      setMensaje(error.message);
    }
  }


  return (
    <div className="bg-white-300 h-screen text-black flex">
      <div className="w-full max-w-xs m-auto">
        {mensaje && <Mensaje mensajeX={mensaje} />}

        <form onSubmit={handleSubmit} className="bg-gray-50 shadow-md rounded
             px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
          <label htmlFor="email" className="block
                     text-gray-500 text-center mb-2">Sistema BETA v1.0</label>
            <label htmlFor="email" className="block
                     text-gray-700 text-sm mb-2">Email</label>
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

          <button className="bg-blue-500 hover:bg-blue-700
                text-white text-sm font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline">Registrar</button>
        </form>
        <p className="my-4 text-sm flex justify-between px-3">¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
        <p className="my-4 text-sm flex justify-between px-3 text-gray-400">
                    L.I. Omar Esteban | mx.esteban@outlook.com
                </p>
      </div>
    </div>
  )
}
