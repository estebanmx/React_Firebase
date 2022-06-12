import { Routes, Route } from 'react-router-dom';
import { Home } from './componentes/Home';
import { Login } from './componentes/Login';
import { ProtegerRuta } from './componentes/ProtegerRuta';
import { Registro } from './componentes/Registro';
import { Recuperar } from './componentes/Recuperar';
import { AutenticaProveedor } from './contexto/autentContexto';

// className="bg-slate-300 h-screen text-black flex"
function App() {
  return (
    <div >
      <AutenticaProveedor> 
        <Routes>          
          <Route path="/" element={<ProtegerRuta> <Home /> </ProtegerRuta>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />  
          <Route path="/recuperar" element={<Recuperar />} />          
        </Routes>
        </AutenticaProveedor>

    </div>
  );
}

export default App;
