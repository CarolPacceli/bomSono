const getConnection = require("./db")

/**
 * INSERT INTO Cliente(nome, endereco, nacionalidade, telefone, senha, email, cpf) VALUES('Carolina Pacceli', 'Rua qqc, numero 34', 'Brasileira', '(31) 9 1111-2222', 'qqc12345', 'carol@qqc.com' ,'123.456.789-12');
 */
const addClient = async (nome, endereco, nacionalidade, telefone, senha, email, cpf) => {
  const connection = await getConnection()
  return connection.execute(
    "INSERT INTO Cliente (nome, endereco, nacionalidade, telefone, senha, email, cpf) values (?,?,?,?,?,?,?)",
    [nome, endereco, nacionalidade, telefone, senha, email, cpf]
  )
}
/**
 * INSERT INTO Churrasqueiras(capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor) VALUES(15, 3, '2022-10-20', '20:00:00', '22:00:00', FALSE, TRUE, TRUE, 250.00);
 */
const addChurrasqueira = async (capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor) => {
    const connection = await getConnection()
    return connection.execute(
      "INSERT INTO Churrasqueira (capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor) values (?,?,?,?,?,?,?,?,?)",
      [capacidadePes,cod, data, horarioI, horarioF, acessibilidadeChurras, temTv, temFreezer, valor]
    )
  }

/**
 * INSERT INTO Apartamento(numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade) VALUES(601, TRUE, TRUE, FALSE, 400.00, '5', 'Maceio');
 */
const createApto = async (nomeFunc,numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade) => {
    const connection = await getConnection()
    let exist = connection.execute(
        "select * from Funcionarios where e.nomeFunc=?.",
        [nomeFunc]
      )
    if(nomeFunc==="admin" && exist)
    return connection.execute(
      "INSERT INTO Apartamento (numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade) values (?,?,?,?,?,?,?)",
      [numAp, acessibilidade, temTv, temFrigobar, diaria, tipoApto, cidade]
    )
}

const createFunc = async (nomeFunc,cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade) => {
    const connection = await getConnection()
    
    return connection.execute(
      "INSERT INTO Funcionarios (nomeFunc,cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade) values (?,?,?,?,?,?)",
      [nomeFunc,cpfFunc, funcao, enderecoFunc, telefoneFunc, cidade]
    )
}

 const getCliente = async client => {
    const connection = await getConnection()
    return connection.execute(
      "SELECT * FROM Cliente WHERE nome=? AND senha=?",
      [client.nome, client.senha]
    )
  }

  const reserva = async (DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva) => {
    const connection = await getConnection()
    return connection.execute(
      "INSERT INTO Reserva (DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva) values (?,?,?,?,?,?,?)",
      [DataReserva, dataEnt, dataSai, numPes, nome, numAp, codReserva]
    )
  }

  const apartamentos = async (cidade) => {
    const connection = await getConnection()
    return connection.execute(
      "select * from Apartamento where cidade=?",
      [cidade]
    )
  }

module.exports = {
    addClient,
    getCliente,
    createApto,
    addChurrasqueira, 
    reserva,
    apartamentos,
    createFunc
}