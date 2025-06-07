import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './componentes/common/Navegacion';
import PiePagina from './componentes/layout/PiePagina';
import InicioPage from './paginas/InicioPage';
import AutoresPage from './paginas/AutoresPage';
import LibrosPage from './paginas/LibrosPage';
import CrearLibroPage from './paginas/CrearLibroPage';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', display: 'flex', flexDirection: 'column' }}>
        <Navegacion />
        <main className="contenedor-principal" style={{ paddingTop: '2rem', paddingBottom: '2rem', flex: 1 }}>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/autores" element={<AutoresPage />} />
            <Route path="/libros" element={<LibrosPage />} />
            <Route path="/crear-libro" element={<CrearLibroPage />} />
          </Routes>
        </main>
        <PiePagina />
      </div>
    </Router>
  );
}

export default App;