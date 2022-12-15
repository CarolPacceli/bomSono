const express = require("express");
const {
  getAllInfoCliente,
  addChurrasqueira,
  clietesPCidade,
  apartamentos,
  hospedagem,
  getCliente,
  createFunc,
  addClient,
  reserva,
  quartos,
  diaria,
  hoteis,
  conta,
  camareira,
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

app.post("/registrarDiaria", async function (request, response) {
  try {
    const { nomeFunc, data, consumoFrig, numAp, nome } = request.body;
    const [result] = await diaria(nomeFunc, data, consumoFrig, numAp, nome);
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

app.post("/conta", async function (request, response) {
  try {
    const { nome } = request.body;
    const [result] = await conta(nome);
    if (result) {
      console.log(result[0]);
      let totalD = 0;
      for (const x in result) {
        totalD += parseFloat(result[x].consumoFrig);
        console.log(result[x].consumoFrig);
      }
      response.send({ success: true, total: totalD });
    } else {
      response.status(400).send({
        success: false,
        error: "Não foi encotrar nenhuma diaria associada a essa pessoa",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/checkOut", async function (request, response) {
  try {
    const { nome } = request.body;
    console.log("Nome: ", nome);
    const user = await getAllInfoCliente(nome);
    const [dia] = await conta(nome);
    const [hos] = await hospedagem(nome);
    if (dia || hos) {
      let totalD = 0;
      for (const x in dia) {
        totalD += parseFloat(dia[x].consumoFrig);
        console.log("Consumo Dia: ", dia[x].consumoFrig);
      }
      let totalH = 0;
      for (const y in hos) {
        totalD += parseFloat(hos[y].ConsumoRes);
        console.log("Consumo Hos: ", hos[y].ConsumoRes);
      }
      result = totalD + totalH;
      response.status(200).send({ reserva: user[0], total: result });
    } else {
      response.status(400).send({
        success: false,
        error: "Não possivel realizar o check-out",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/getUserFromR", async function (request, response) {
  try {
    const { cidade, dataEnt, dataSai } = request.body;
    const [user] = await clietesPCidade(cidade, dataEnt, dataSai);
    if (user) {
      console.log(user);
      response.status(200).send({ users: user });
    } else {
      response.status(400).send({
        success: false,
        error: `Não possivel encontrar usuários neste intervalo ${dataEnt} a ${dataSai} na cidade ${cidade}`,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/getCamareira", async function (request, response) {
  try {
    const { numAp, dataI, dataF } = request.body;
    const [result] = await camareira(numAp, dataI, dataF);
    if (result) {
      console.log(result);
      response.status(200).send({ camareiras: result });
    } else {
      response.status(400).send({
        success: false,
        error: `Não possivel encontrar camareiras neste intervalo ${dataEnt} a ${dataSai} na cidade ${cidade}`,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/getQuartos", async function (request, response) {
  try {
    const { cidade } = request.body;
    const [result] = await quartos(cidade);
    if (result) {
      console.log(result);
      response.status(200).send({ hoteis: result.length });
    } else {
      response.status(400).send({
        success: false,
        error: `Não possivel encontrar hoteis do tipo '1 cama de casal' na cidade ${cidade}`,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get("/getAllQuartos", async function (request, response) {
  try {
    const [cidades] = await hoteis();
    let result = [];
    let info = [{}];
    for (i in cidades) {
      const [quartosT] = await quartos(cidades[i].cidade);
      if (quartosT) {
        result.concat(quartosT);
        info.push({ cidade: cidades[i].cidade, numeroQuartos: quartosT.length });
      }
    }
    if (info) {
      console.log(info);
      response.status(200).send(info);
    } else {
      response.status(400).send({
        success: false,
        error: `Não possivel encontrar hoteis do tipo '1 cama de casal' na cidade ${cidade}`,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(8001);
