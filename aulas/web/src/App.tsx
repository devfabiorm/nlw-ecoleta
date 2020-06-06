import React from 'react';
import './App.css';

import Routes from './routes';

//JSX: Sintaxe de XML dentro do JavaScript
//Estado: um valor que um componente deve armazenar por si só
//Imutabilidade: No React não é possível mudar o valor de uma variável, mas tempos que passar um novo valor para um estado

function App() {
  return (
    <Routes />
  );
}

export default App;
