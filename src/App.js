import React from 'react';
import './App.css'; // Opcional, para estilos
import RandomUsersComponent from './RandomUsersComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Usuarios Aleatorios</h1>
      </header>
      <main>
        <RandomUsersComponent />
      </main>
    </div>
  );
}

export default App;
