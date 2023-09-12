let { contas, saques, depositos, transferencias } = require('../bancodedados')

const depositar = (req, resp) => {

  const { numero_conta, valor } = req.body

  try {
    if (!validarConta(req, resp)) return
    let conta = verificarSeContaExixte(numero_conta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
    const deposito = { data: new Date(), numero_conta, valor }
    depositos.push(deposito)
    conta.saldo += valor
    return resp.status(200).json()
  } catch (error) {
    return resp.status(500).json({ "erro": error.message })
  }
}

const sacar = (req, resp) => {

  const { senha, numero_conta, valor } = req.body
  try {

    if (!validarConta(req, resp)) return
    let conta = verificarSeContaExixte(numero_conta)
    if (!conta) return resp.status(404).json({ "message": "Conta não encontrada" })
    if (senha !== conta.usuario.senha) {
      return resp.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
    }
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
    if (!validarContaTransferencia(req, resp)) return
    const contaOrigem = verificarSeContaExixte(numero_conta_origem)
    const contaDestino = verificarSeContaExixte(numero_conta_destino)
    if (!contaOrigem) return resp.status(404).json({ "message": "Conta não encontrada" })
    if (!contaDestino) return resp.status(404).json({ "message": "Conta destino não encontrada" })
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

const verificarSeContaExixte = (numero_conta) => {
  const conta = contas.find((conta) => {
    return conta.numero === Number(numero_conta)
  })
  if (!conta) {
    return false
  }
  return conta
}

const validarConta = (req, resp) => {

  const { numero_conta, valor } = req.body

  if (numero_conta === '' || !numero_conta) {
    resp.status(400).json({ "mensagem": "Número de conta é obrigatório" })
    return false
  }
  if (valor === '' || !valor) {
    resp.status(400).json({ "mensagem": "Valor é obrigatório" })
    return false
  }
  if (isNaN(numero_conta)) {
    resp.status(400).json({ "message": "Número de conta inválido" })
    return false
  }
  if (valor <= 0) {
    resp.status(400).json({ "mensagem": "Valor deve ser maior que 0" })
    return false
  }
  if (isNaN(valor)) {
    resp.status(400).json({ "message": "Valor inválido" })
    return false
  }
  return true
}


const validarContaTransferencia = (req, resp) => {

  const { numero_conta_origem, numero_conta_destino, valor } = req.body

  if (numero_conta_origem === '' || !numero_conta_origem) {
    resp.status(400).json({ "mensagem": "Número de conta origem é obrigatório" })
    return false
  }
  if (numero_conta_destino === '' || !numero_conta_destino) {
    resp.status(400).json({ "mensagem": "Número de conta do destinatário é obrigatório" })
    return false
  }
  if (valor === '' || !valor) {
    resp.status(400).json({ "mensagem": "Valor é obrigatório" })
    return false
  }
  if (valor <= 0) {
    resp.status(400).json({ "mensagem": "Valor deve ser maior que 0" })
    return false
  }
  if (isNaN(numero_conta_origem)) {
    resp.status(400).json({ "message": "Número de conta inválido" })
    return false
  }
  if (isNaN(valor)) {
    resp.status(400).json({ "message": "Valor inválido" })
    return false
  }
  return true
}

module.exports = { depositar, sacar, transferir }