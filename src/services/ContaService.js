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
    if (!validarConta(contas, req, resp)) return
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

  const { numeroConta } = req.params
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body.usuario
  try {
    if (isNaN(numeroConta)) return resp.status(400).json({ "message": "Número de conta inválido" })
    if (!validarConta(contas, req, resp)) return
    let conta = verificarSeContaExixte(numeroConta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
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
    if (isNaN(numeroConta)) {
      return resp.status(400).json({ "message": "Número de conta inválido" })
    }
    let conta = verificarSeContaExixte(numeroConta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
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

  const { numero_conta, senha } = req.query
  try {
    if (senha === '' || !senha) {
      resp.status(400).json({ "mensagem": "Campo Senha é obrigatório" })
      return false
    }
    if (numero_conta === '' || !numero_conta) {
      resp.status(400).json({ "mensagem": "Campo número de conta é obrigatório" })
      return false
    }
    if (isNaN(numero_conta)) {
      return resp.status(400).json({ "message": "Número de conta inválido" })
    }
    let conta = verificarSeContaExixte(numero_conta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
    if (senha !== conta.usuario.senha) {
      return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
    }
    return resp.status(200).json({ "saldo": `${conta.saldo}` })
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const extrato = (req, resp) => {

  const { numero_conta, senha } = req.query
  try {
    if (senha === '' || !senha) return resp.status(400).json({ "mensagem": "Campo Senha é obrigatório" })
    if (numero_conta === '' || !numero_conta) return resp.status(400).json({ "mensagem": "Campo número de conta é obrigatório" })
    if (isNaN(numero_conta)) return resp.status(400).json({ "message": "Número de conta inválido" })
    let conta = verificarSeContaExixte(numero_conta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
    if (senha !== conta.usuario.senha) return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
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

const validarConta = (arrayContas, req, resp) => {

  const { usuario } = req.body
  if (usuario.nome === '' || !usuario.nome) {
    resp.status(400).json({ "mensagem": "Campo nome é obrigatório" })
    return false
  }
  if (usuario.data_nascimento === '' || !usuario.data_nascimento) {
    resp.status(400).json({ "mensagem": "Campo data de nascimento é obrigatório" })
    return false
  }
  if (usuario.telefone === '' || !usuario.telefone) {
    resp.status(400).json({ "mensagem": "Campo telefone é obrigatório" })
    return false
  }
  if (req.method !== "PUT") {
    if (!usuario.cpf) {
      resp.status(400).json({ "mensagem": "Campo Cpf é obrigatório" })
      return false
    }
    if (!usuario.email) {
      resp.status(400).json({ "mensagem": "Campo e-mail é obrigatório" })
      return false
    }
  }
  if (usuario.cpf === '') {
    resp.status(400).json({ "mensagem": "Campo Cpf é obrigatório" })
    return false
  }
  if (usuario.email === '') {
    resp.status(400).json({ "mensagem": "Campo e-mail é obrigatório" })
    return false
  }

  if (usuario.senha === '' || !usuario.senha) {
    resp.status(400).json({ "mensagem": "Campo Senha é obrigatório" })
    return false
  }
  const seCpfEmail = arrayContas.find((field) => {
    return (field.usuario.cpf === usuario.cpf || field.usuario.email === usuario.email)
  })
  if (seCpfEmail) {
    resp.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
    return false
  }
  return true
}

const verificarSeContaExixte = (numero_conta) => {
  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta)
  })
  if (!conta) {
    return false
  }
  return conta
}

module.exports = { listar, criar, atualizar, excluir, saldo, extrato }