import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./css/app.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  async function handleSearch (){
    //31920-550/json/

    if(input === ''){
      alert('Preencha com algum  CEP!!');
      return;
    }

    try{
      const response = await api.get(`${input}/json/`);
      setInput('');
      setCep(response.data)
    } catch {
      alert('Erro ao buscar');
      setInput('');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input type="text" 
        placeholder="Digite seu CEP..."
        value={ input }
        onChange={(e) => {
          setInput(e.target.value);
        }
        }/>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} className="iconSeach"/>
        </button>
      </div>
      <main>
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} </span>
        <span>Complemento: {cep.complemento} </span>
      </main>
    </div>
  );
}

export default App;
