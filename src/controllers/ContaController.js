const { app, express } = require('../server/index')
const { listar, criar, atualizar, excluir, saldo, extrato } = require('../services/ContaService')

rotas = () => {
  app.get('/contas', listar)
  app.post('/contas', criar)
  app.put('/contas/:numeroConta/usuario', atualizar)
  app.delete('/contas/:numeroConta', excluir)
  app.get('/contas/saldo', saldo)
  app.get('/contas/extrato', extrato)

}
module.exports = { rotas }; 