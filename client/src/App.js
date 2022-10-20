import React from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = React.useState();
  const [listaPessoas, setListaPessoas] = React.useState([]);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/listar").then((res) => {
      setListaPessoas(res.data);
      // console.log(res.data);
    });
  }, []);

  const handleChangeValues = (values) => {
    setValues((prevValue) => ({
      ...prevValue,
      [values.target.name]: values.target.value,
    }));
  };

  const addPessoa = () => {
    Axios.post("http://localhost:3001/criar", {
      nome: values.nome,
      cpf: values.cpf,
      idade: values.idade,
    }).then((response) => {
      console.log("Sucesso");
    });
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Cadastrar  pessoas</h1>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="Idade"
          name="idade"
          className="register-input"
          onChange={handleChangeValues}
        />

        <button className="register-button" onClick={() => addPessoa()}>
          Cadastrar
        </button>

      </div>

      <h2 style={{marginTop: '2rem', marginBottom: '1rem', fontSize: '1.7rem'}}>Lista de pessoas</h2>
      {listaPessoas.map((pessoa) => {
        return (
          <>
            <Card
              listaPessoas={listaPessoas}
              setListaPessoas={setListaPessoas}
              key={pessoa.id}
              id={pessoa.id}
              nome={pessoa.nome}
              cpf={pessoa.cpf}
              idade={pessoa.idade}
              />
            </>
        );
      })}
    </div>
  );
}
