let { contas, saques, depositos, transferencias } = require('../bancodedados')

const depositar = (req, resp) => {

  const { numero_conta, valor } = req.body

  try {
    let conta = getConta(resp, numero_conta)
    if (!conta) return
    const deposito = { data: new Date(), numero_conta, valor }
    depositos.push(deposito)
    conta.saldo += valor
    return resp.status(200).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const sacar = (req, resp) => {

  const { numero_conta, valor } = req.body
  try {
    let conta = getConta(resp, numero_conta)
    if (!conta) return
    if (conta.saldo < valor) return resp.status(401).json({ "mensagem": "Saldo insuficiente!" })
    const saque = { data: new Date(), numero_conta, valor }
    saques.push(saque)
    conta.saldo -= valor
    return resp.status(200).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const transferir = (req, resp) => {

  const { senha, numero_conta_origem, numero_conta_destino, valor } = req.body
  try {
    const contaOrigem = getConta(resp, numero_conta_origem)
    const contaDestino = getConta(resp, numero_conta_destino)
    if (contaOrigem === contaDestino) return resp.status(404).json({ "message": "Conta destino não pode ser igual a conta origem" })
    if (senha !== contaOrigem.usuario.senha) {
      return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
    }
    if (valor > contaOrigem.saldo) return resp.status(401).json({ "mensagem": "Saldo insuficiente!" })
    contaOrigem.saldo -= valor
    contaDestino.saldo += valor
    const transferencia = { data: new Date(), numero_conta_origem, numero_conta_destino, valor }
    transferencias.push(transferencia)
    return resp.status(204).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const getConta = (resp, numero_conta) => {

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

const validarDados = (req, resp, next) => {

  const { numero_conta, valor } = req.body
  if (numero_conta === '' || !numero_conta) {
    return resp.status(400).json({ "mensagem": "Número de conta é obrigatório" })
  }
  if (valor === '' || !valor) {
    return resp.status(400).json({ "mensagem": "Valor é obrigatório" })
  }
  if (isNaN(numero_conta)) {
    return resp.status(400).json({ "message": "Número de conta inválido" })
  }
  if (valor <= 0) {
    return resp.status(400).json({ "mensagem": "Valor deve ser maior que 0" })
  }
  if (isNaN(valor)) {
    return resp.status(400).json({ "message": "Valor inválido" })
  }
  return next()
}

const validarDadosTransferencia = (req, resp, next) => {

  const { numero_conta_origem, numero_conta_destino, valor } = req.body
  if (numero_conta_origem === '' || !numero_conta_origem) {
    return resp.status(400).json({ "mensagem": "Número de conta origem é obrigatório" })
  }
  if (numero_conta_destino === '' || !numero_conta_destino) {
    return resp.status(400).json({ "mensagem": "Número de conta do destinatário é obrigatório" })
  }
  if (valor === '' || !valor) {
    return resp.status(400).json({ "mensagem": "Valor é obrigatório" })
  }
  if (valor <= 0) {
    return resp.status(400).json({ "mensagem": "Valor deve ser maior que 0" })
  }
  if (isNaN(numero_conta_origem)) {
    return resp.status(400).json({ "message": "Número de conta inválido" })
  }
  if (isNaN(valor)) {
    return resp.status(400).json({ "message": "Valor inválido" })
  }
  return next()
}

const loginConta = (req, resp, next) => {

  const { numero_conta, senha } = req.body
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

module.exports = {
  depositar,
  sacar,
  transferir,
  validarDados,
  loginConta,
  validarDadosTransferencia
}