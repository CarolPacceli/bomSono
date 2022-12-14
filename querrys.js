const getConnection = require("./db");

/**
 * INSERT INTO Cliente(nome, endereco, nacionalidade, telefone, senha, email, cpf) VALUES('Carolina Pacceli', 'Rua qqc, numero 34', 'Brasileira', '(31) 9 1111-2222', 'qqc12345', 'carol@qqc.com' ,'123.456.789-12');
 */
const addClient = async (
  nome,
  endereco,
  nacionalidade,
  telefone,
  senha,
  email,
  cpf
) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO Cliente (nome, endereco, nacionalidade, telefone, senha, email, cpf) values (?,?,?,?,?,?,?)",
    [nome, endereco, nacionalidade, telefone, senha, email, cpf]
  );
};
/**
 * INSERT INTO Churrasqueiras(capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor) VALUES(15, 3, '2022-10-20', '20:00:00', '22:00:00', FALSE, TRUE, TRUE, 250.00);
 */
const addChurrasqueira = async (
  capacidadePes,
  cod,
  data,
  horarioI,
  horarioF,
  acessibilidadeChurras,
  temTv,
  temFreezer,
  valor
) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO Churrasqueira (capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor) values (?,?,?,?,?,?,?,?,?)",
    [
      capacidadePes,
      cod,
      data,
      horarioI,
      horarioF,
      acessibilidadeChurras,
      temTv,
      temFreezer,
      valor,
    ]
  );
};

/**
 * INSERT INTO Apartamento(numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade) VALUES(601, TRUE, TRUE, FALSE, 400.00, '5', 'Maceio');
 */
const createApto = async (
  nomeFunc,
  numAp,
  acessibilidade,
  temTv,
  temFrigobar,
  diaria,
  tipoApto,
  cidade
) => {
  const connection = await getConnection();
  let exist = connection.execute(
    "select * from Funcionarios where e.nomeFunc=?.",
    [nomeFunc]
  );
  if (nomeFunc === "admin" && exist)
    return connection.execute(
      "INSERT INTO Apartamento (numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade) values (?,?,?,?,?,?,?)",
      [numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade]
    );
};

const createFunc = async (
  nomeFunc,
  cpfFunc,
  funcao,
  enderecoFunc,
  telefoneFunc,
  cidade
) => {
  const connection = await getConnection();

  return connection.execute(
    "INSERT INTO Funcionarios (nomeFunc,cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade) values (?,?,?,?,?,?)",
    [nomeFunc, cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade]
  );
};

const getCliente = async (client) => {
  const connection = await getConnection();
  return connection.execute("SELECT * FROM Cliente WHERE nome=? AND senha=?", [
    client.nome,
    client.senha,
  ]);
};

const getAllInfoCliente = async (nome) => {
  const connection = await getConnection();
  return connection.execute("SELECT nome, cpf FROM Cliente WHERE nome=?", [nome]);
};

const reserva = async (
  DataReserva,
  dataEnt,
  dataSai,
  numPes,
  nome,
  numAp,
  codReserva
) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO Reserva (DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva) values (?,?,?,?,?,?,?)",
    [DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva]
  );
};

const apartamentos = async (cidade) => {
  const connection = await getConnection();
  return connection.execute("select * from Apartamento where cidade=?", [
    cidade,
  ]);
};

const diaria = async (nomeFunc, data, consumoFrig, numAp, nome) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO Diarias (nomeFunc, data, consumoFrig, numAp, nome) values (?,?,?,?,?)",
    [nomeFunc, data, consumoFrig, numAp, nome]
  );
};

const conta = async (nome) => {
  const connection = await getConnection();
  return connection.execute("select * from Diarias where nome=?", [nome]);
};

const hospedagem = async (nome) => {
  const connection = await getConnection();
  return connection.execute("select * from Hospedagem where nome=?", [nome]);
};

const camareira = async (numAp, data) => {
    const connection = await getConnection();
    return connection.execute("select nomeFunc from Diarias where numAp=? and data=?", [numAp, data]);
  };

const clietesPCidade = async (cidade, dataEnt, dataSai) => {
    const connection = await getConnection();
    return connection.execute("select nome from Reserva, Apartamento where Apartamento.numAp=Reserva.numAp and dataEnt=? and dataSai=? and cidade=?", [dataEnt, dataSai]);
  };

  const getAptos = async (cidade, dataEnt, dataSai) => {
    const connection = await getConnection();
    return connection.execute("select nome from Reserva, Apartamento where Apartamento.numAp=Reserva.numAp and dataEnt=? and dataSai=? and cidade=?", [dataEnt, dataSai]);
  };

  const quartos = async (cidade) => {
    const connection = await getConnection();
    return connection.execute("select numAp from Apartamento where cidade=?", [cidade]);
  };

  const hoteis = async () => {
    const connection = await getConnection();
    return connection.execute("select * from Hotel");
  };
module.exports = {
  getAllInfoCliente,
  addChurrasqueira,
  clietesPCidade,
  apartamentos,
  createApto,
  getCliente,
  hospedagem,
  createFunc,
  camareira,
  addClient,
  reserva,
  quartos,
  hoteis,
  diaria,
  conta,
};
