import React, { useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
// Compenete: Bloco isolado de Html, Css e Js, o qual interfere no restante da aplicação
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
// Propriedade: Informeções que um componete Pai passa para o componente filho

function App() {
  const [devs, setDevs] = useState([]);
  
  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();

  }, []);

  async function handleAddDev(data){

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev._id} dev={dev}/>
            
            ))}
        </ul>

      </main>

    </div>
  );
}

export default App;
