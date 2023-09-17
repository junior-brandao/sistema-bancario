const { app } = require('../server/index')
const {
  listar,
  criar,
  atualizar,
  excluir,
  saldo,
  extrato,
  validarDados,
  loginConta
} = require('../services/ContaService')

rotas = () => {
  app.get('/contas', listar)
  app.post('/contas', validarDados, criar)
  app.put('/contas/:numeroConta/usuario', validarDados, atualizar)
  app.delete('/contas/:numeroConta', excluir)
  app.get('/contas/saldo', loginConta, saldo)
  app.get('/contas/extrato', loginConta, extrato)
}
module.exports = { rotas }; 