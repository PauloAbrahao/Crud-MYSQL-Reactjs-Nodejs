import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        cpf={props.cpf}
        idade={props.idade}
        listaPessoas={props.listaPessoas}
        setListaPessoas={props.setListaPessoas}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h2 className="card-title">Nome: {props.nome}</h2>
        <p className="card-id">{props.id}</p>
        <h3 className="card-cartegory">CPF: {props.cpf}</h3>
        <h3 className="card-cost">Idade: {props.idade}</h3>
      </div>
    </>
  );
}