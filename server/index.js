const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "projetoweb",
});

db.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Conectado com sucesso!");
});

app.post("/criar", (req, res) => {
  const { nome } = req.body;
  const { cpf } = req.body;
  const { idade } = req.body;

  db.query(
    "INSERT INTO projetoweb.pessoa (nome, cpf, idade) VALUES (?, ?, ?)",
    [nome, cpf, idade],
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Cadastrado com sucesso!");
    }
  );
});

app.get("/listar", (req, res) => {
  db.query("SELECT * FROM pessoa", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Listado com sucesso!");
      res.json(results);
    }
  });
});

app.put("/editar", (req, res) => {

  const id = req.body.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const idade = req.body.idade;

  db.query(
    "UPDATE pessoa SET nome = ? WHERE id = ?",
    [nome, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/excluir/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM pessoa WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
