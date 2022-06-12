import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';
import { conexion_auth } from '../firebase';

export const contexto = createContext();

export const useAutenticar = () => {
    const contextoX = useContext(contexto);
    if (!contextoX) throw new Error('Sin proveedor de autenticación');
    return contextoX;
}

export function AutenticaProveedor({ children }) {
    //const usuarioPrincipal = {login: true,};
    const [usuarioprincipal, setUsuarioprincipal] = useState(null);
    const [cargando, setCargando] = useState(true);


    const registrar = (correo, contraseña) => createUserWithEmailAndPassword(conexion_auth, correo, contraseña);
    // sigup controla el error   
    //console.log(email, password);

    const acceder = (correo, contraseña) => signInWithEmailAndPassword(conexion_auth, correo, contraseña);
    // const acceder = (correo, contraseña) => { const CredencialUsuario = await signInWithEmailAndPassword(conexion_auth,correo,contraseña); }

    const recuperaracceso = (correo) => sendPasswordResetEmail(conexion_auth, correo);

    //Llamar cuando se inicia la aplicación
    useEffect(() => {
        //console.log('Autenticación de proveedor cargando'); 
        const Desuscribirse = onAuthStateChanged(conexion_auth, usuarioActual => {
            //console.log(usuarioActual)
            setUsuarioprincipal(usuarioActual);
            setCargando(false);
        });


        return () => Desuscribirse();

    }, []);
    // singOut es Promise, va a tomar tiempo, es async
    const cerrarsesion = () => signOut(conexion_auth);

    const accedercongoogle = () => {
        const proveedorGoogle = new GoogleAuthProvider()
        return signInWithPopup(conexion_auth, proveedorGoogle)
    }
    return (
        <contexto.Provider value={{
            registrar,
            acceder,
            usuarioprincipal,
            cerrarsesion,
            cargando,
            accedercongoogle,
            recuperaracceso
        }}>
            {children}
        </contexto.Provider>
    );
} 