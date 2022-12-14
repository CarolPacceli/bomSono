const express = require("express");
const {
  addClient,
  getCliente,
  apartamentos,
  reserva,
  addChurrasqueira,
  createFunc,
} = require("./querrys");
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
    if (result[0]) response.send({ success: true });
    else {
      response.status(401).send({
        success: false,
        error: response.statusMessage,
      });
    }
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/criarApartamento", async function (request, response) {
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

app.post("/apartamento", async function (request, response) {
  try {
    const { cidade } = request.body;
    const [result] = await apartamentos(cidade);
    console.log(result);
    if (result[0]) {
      response.status(200).send({ apartamentos: result[0] });
    } else {
      response.status(400).send({ message: "Não temos hoteis nesta cidade" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/reserva", async function (request, response) {
  try {
    const { DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva } =
      request.body;
    const [result] = await reserva(
      DataReserva,
      dataEnt,
      dataSai,
      numPes,
      nome,
      numAp,
      codReserva
    );
    //   if (result[0]) {
    response.send({ success: true, message: "Reserva Efetuada" });
    //   } else {
    //     response.status(400).send({
    //       success: false,
    //       error: "Não foi possivel efetuar reserva",
    //     });
    //   }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/criarFunc", async function (request, response) {
  try {
    const { nomeFunc, cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade } =
      request.body;
    const [result] = await createFunc(
      nomeFunc,
      cpfFunc,
      funcao,
      enderecoFunc,
      telefoneFunc,
      cidade
    );
    //   if (result[0]) {
    response.send({ success: true, message: "Funcionario cadastrado" });
    //   } else {
    //     response.status(400).send({
    //       success: false,
    //       error: "Não foi possivel efetuar reserva",
    //     });
    //   }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/reservaChurrasqueira", async function (request, response) {
  try {
    const {
      capacidadePes,
      cod,
      data,
      horarioI,
      horarioF,
      acessibilidadeChurras,
      temTv,
      temFreezer,
      valor,
    } = request.body;
    const [result] = await addChurrasqueira(
      capacidadePes,
      cod,
      data,
      horarioI,
      horarioF,
      acessibilidadeChurras,
      temTv,
      temFreezer,
      valor
    );
    //   if (result[0]) {
    response.send({ success: true, message: "Reserva Efetuada" });
    //   } else {
    //     response.status(400).send({
    //       success: false,
    //       error: "Não foi possivel efetuar reserva",
    //     });
    //   }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(8001);
