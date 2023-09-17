const { app } = require('../server/index')
const {
  depositar,
  sacar,
  transferir,
  validarDados,
  loginConta,
  validarDadosTransferencia
} = require('../services/TransacaoService')

rotas = () => {
  app.post('/transacoes/depositar', validarDados, depositar)
  app.post('/transacoes/sacar', validarDados, loginConta, sacar)
  app.post('/transacoes/transferir', validarDadosTransferencia, transferir)
}
module.exports = { rotas }; 