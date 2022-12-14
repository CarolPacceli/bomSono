const express = require("express");
const { addClient, getCliente } = require("./querrys");
const app = express();

const Erro = "Algo deu errado";

app.use(express.json());

app.post("/cadastro", async function (request, response) {
  try {
    const { nome, endereco, nacionalidade, telefone, senha, email, cpf } =
      request.body;
    const [result] = await addClient(
      nome,
      endereco,
      nacionalidade,
      telefone,
      senha,
      email,
      cpf
    );
    response.send({ success: true });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/login", async function (request, response) {
  try {
    const { nome, senha } = request.body;
    let client = { nome, senha };
    const [result] = await getCliente(client);

    response.send({ success: true });
    // } else {
    //   response.status(500).send({
    //     success: false,
    //     error: response.statusMessage,
    //   });
    // }
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/apartamento", async function (request, response) {
  try {
    const {
      nomeFunc,
      numAp,
      acessibilidade,
      temTv,
      temFrigobar,
      diaria,
      tipoApto,
      cidade,
    } = request.body;
    const [result] = await createApto(
      nomeFunc,
      numAp,
      acessibilidade,
      temTv,
      temFrigobar,
      diaria,
      tipoApto,
      cidade
    );
    if (result.insertId) {
      response.send({ success: true });
    } else {
      response.status(500).send({
        success: false,
        error: response.statusMessage,
      });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(8001);
