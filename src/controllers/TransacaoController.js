const { app, express } = require('../server/index')
const { depositar, sacar, transferir } = require('../services/TransacaoService')

rotas = () => {
  app.post('/transacoes/depositar', depositar)
  app.post('/transacoes/sacar', sacar)
  app.post('/transacoes/transferir', transferir)
}
module.exports = { rotas }; 