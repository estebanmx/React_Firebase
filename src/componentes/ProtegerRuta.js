// Cuando se cierra sesión en Home intenta escribir el mail
// se tiene que crear una ruta protegida para evitar el error
import { useAutenticar } from '../contexto/autentContexto';
import { Navigate } from 'react-router-dom';

export function ProtegerRuta({ children }) {
    const { usuarioprincipal, cargando } = useAutenticar()

    if (cargando) return <h1>Verificando</h1>
    if (!usuarioprincipal) return <Navigate to='/login' />

    return <>{children}</>;
}