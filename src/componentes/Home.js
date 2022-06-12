import { useAutenticar } from '../contexto/autentContexto';
import '../sidemenu.css';
import perfil from '../img/perfil.jpg';
import catalogo from '../img/catalog.png';
import { useState } from 'react';

export function Home() {
    const { usuarioprincipal, cerrarsesion, cargando } = useAutenticar();
    //console.log(usuarioprincipal);
    const [menu, setMenu] = useState('menu-expanded');
    const handleSalir = async () => {
        try {
            await cerrarsesion()
        } catch (error) {
            console.error(error);
        }
    };

    const handleCambiarMenu = () => {
        if (menu === 'menu-expanded') {
            setMenu('menu-collapsed')
        } else {
            setMenu('menu-expanded')
        }
        console.log(menu);
    }


    if (cargando) return <h1>cargando</h1>

    return (
        <div>
            <div id='sidemenu' className={menu}>

                {/* HEADER */}
                <div id='header'>
                    <div id='title'> <span>Sistema BETA v1.0</span></div>
                    <div id='menu-btn' onClick={handleCambiarMenu}>
                        <div className="btn-hamburger"></div>
                        <div className="btn-hamburger"></div>
                        <div className="btn-hamburger"></div>
                    </div>
                </div>
                {/* Perfil */}
                <div id="profile">
                    <div id="photo">  <img src={usuarioprincipal.photoURL || perfil} /> </div>
                    <div id='name'>
                        <span>{usuarioprincipal.displayName || usuarioprincipal.email}</span>
                        <br></br>
                        <button onClick={handleSalir} className='bg-slate-200 text-sm
                hover:bg-slate-300 rounded py-2 px-4 text-white bg-red-500 hover:bg-red-700' >Cerrar sesión</button>
                        
                    </div>
                </div>
                {/* Items */}
                <div id='menu-items'>
                    <div className="item">
                        <a href=''>
                            <div className="icon"><img src={catalogo} /></div>
                            <div className='title'> <span>Inicio</span> </div>
                        </a>
                    </div>
                    <div className="item separator"></div>
                    <div className="item">
                        <a href=''>
                            <div className="icon"><img src={catalogo} /></div>
                            <div className='title'> <span>Catálogos</span> </div>
                        </a>
                    </div>
                    <div className="item">
                        <a href=''>
                            <div className="icon"><img src={catalogo} /></div>
                            <div className='title'> <span>Usuarios</span> </div>
                        </a>
                    </div>
                    <div className="item">
                        <a href=''>
                            <div className="icon"><img src={catalogo} /></div>
                            <div className='title'> <span>Configuración</span> </div>
                        </a>
                    </div>
                    
                </div>
                {/* <div id='main-container'>
                
                <div className='w-full max-w-xs m-auto text-black'>
                    <div className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                        <h1 className='textxl- mb-4'>Usuario: {usuarioprincipal.displayName || usuarioprincipal.email}</h1>
                        <button onClick={handleSalir} className='bg-slate-200 text-sm
                hover:bg-slate-300 rounded py-2 px-4 text-black' >Cerrar sesión</button>
                    </div>
                </div>
            </div> */}
            </div>
            <div className="bg-white shadow-md rounded
             px-4 pt-1 pb-2 mb-2 flex items-center float-right text-sm">
                by L.I. Omar Esteban | mx.esteban@outlook.com
            </div>
        </div>
    )
}

