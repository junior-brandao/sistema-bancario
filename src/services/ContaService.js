let { banco, contas, saques, depositos, transferencias } = require('../bancodedados')

const listar = async (req, resp) => {

  const { senha_banco } = req.query
  try {
    if (senha_banco !== banco.senha) {
      return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
    }
    return resp.status(200).json(contas)
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const criar = (req, resp) => {

  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body.usuario
  let numero = 0
  contas.length === 0 ? numero = 1 : numero = contas[contas.length - 1].numero + 1
  try {
    const conta = {
      numero,
      saldo: 0,
      usuario: { nome, cpf, data_nascimento, telefone, email, senha }
    }
    contas.push(conta)
    return resp.status(201).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const atualizar = (req, resp) => {

  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body.usuario
  try {

    let conta = getConta(req, resp)
    if (!conta) return
    conta.usuario.nome = nome
    conta.usuario.data_nascimento = data_nascimento
    conta.usuario.telefone = telefone
    if (cpf) conta.usuario.cpf = cpf
    if (email) conta.usuario.email = email
    conta.usuario.senha = senha
    return resp.status(204).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const excluir = (req, resp) => {

  const { numeroConta } = req.params
  try {

    let conta = getConta(req, resp)
    if (!conta) return
    if (conta.saldo != 0) return resp.status(400).json({ "message": "A conta só pode ser removida se o saldo for zero!" })
    contas = contas.filter((conta) => {
      return conta.numero !== Number(numeroConta)
    })
    return resp.status(204).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }

}

const saldo = (req, resp) => {

  const { numero_conta } = req.query
  try {
    const conta = contas.find((conta) => {
      return conta.numero === Number(numero_conta)
    })
    return resp.status(200).json({ "saldo": `${conta.saldo}` })
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const extrato = (req, resp) => {

  const { numero_conta } = req.query
  try {
    const deposito = depositos.filter((conta) => {
      return (conta.numero_conta === Number(numero_conta))
    })
    const saque = saques.filter((conta) => {
      return (conta.numero_conta === Number(numero_conta))
    })
    const transferenciasRecebidas = transferencias.filter((conta) => {
      return (conta.numero_conta_destino === Number(numero_conta))
    })
    const transferenciasEnviadas = transferencias.filter((conta) => {
      return (conta.numero_conta_destino !== Number(numero_conta))
    })
    const extrato = {
      depositos: deposito,
      saques: saque,
      transferenciasRecebidas,
      transferenciasEnviadas
    }
    return resp.status(200).json(extrato)
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const validarDados = (req, resp, next) => {

  const { numeroConta } = req.params
  const { usuario } = req.body

  if (usuario.nome === '' || !usuario.nome) {
    return resp.status(400).json({ "mensagem": "Campo nome é obrigatório" })
  }
  if (usuario.data_nascimento === '' || !usuario.data_nascimento) {
    return resp.status(400).json({ "mensagem": "Campo data de nascimento é obrigatório" })
  }
  if (usuario.telefone === '' || !usuario.telefone) {
    return resp.status(400).json({ "mensagem": "Campo telefone é obrigatório" })
  }
  if (req.method !== "PUT") {
    if (!usuario.cpf) {
      return resp.status(400).json({ "mensagem": "Campo Cpf é obrigatório" })
    }
    if (!usuario.email) {
      return resp.status(400).json({ "mensagem": "Campo e-mail é obrigatório" })
    }
  }
  if (usuario.cpf === '') {
    return resp.status(400).json({ "mensagem": "Campo Cpf é obrigatório" })
  }
  if (usuario.email === '') {
    return resp.status(400).json({ "mensagem": "Campo e-mail é obrigatório" })
  }
  if (usuario.senha === '' || !usuario.senha) {
    return resp.status(400).json({ "mensagem": "Campo Senha é obrigatório" })
  }
  const seCpfEmail = contas.find((field) => {
    return field.usuario.cpf === usuario.cpf && field.numero !== Number(numeroConta)
      || field.usuario.email === usuario.email && field.numero !== Number(numeroConta)
  })
  if (seCpfEmail) {
    return resp.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
  }
  return next()
}

const getConta = (req, resp) => {

  const numero_conta = req.params.numeroConta
  if (isNaN(numero_conta)) return resp.status(400).json({ "message": "Número de conta inválido" })
  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta)
  })
  if (!conta) {
    resp.status(404).json({ "message": "Conta não encontrada" })
    return false
  }
  return conta
}

const loginConta = (req, resp, next) => {

  const { numero_conta, senha } = req.query
  if (senha === '' || !senha) {
    return resp.status(400).json({ "mensagem": "Campo Senha é obrigatório" })
  }
  if (numero_conta === '' || !numero_conta) {
    return resp.status(400).json({ "mensagem": "Campo número de conta é obrigatório" })
  }
  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta)
  })
  if (!conta) {
    return resp.status(404).json({ "message": "Conta não encontrada" })
  }
  if (senha !== conta.usuario.senha) {
    return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
  }
  return next()
}

module.exports =
{
  listar,
  criar,
  atualizar,
  excluir,
  saldo,
  extrato,
  validarDados,
  loginConta
}