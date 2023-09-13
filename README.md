# API Sistema Bancário

 Projeto de estudo para criação de api RESTful, onde utilizo das seguinte tecnologias:

[![node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/pt-br/)
[![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)](https://www.postman.com/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()
[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juniorbrandao/)

### Configurações para inicialização

- Você pode optar por clonar o projeto utilizando de git clone, no acesso github.com/junior-brandao/sistema-bancario.
- Utilize o VS CODE para abri-lo.
- Através do comando > npm install, baixe e instale as dependências do projeto.
- Após executar sua aplicação através do comando > npm run dev, a api estará rodando em <http://localhost:3000>.

## Testes e Documentação

   Através do Postman, crie as requisiçoes http para as rotas existentes.
   Obs: Você pode importar o script em: **`src/scripts/contaBancaria.json`**

## 1 - Visão geral do sistema
  
   O sistema deve criar uma API para um Sistema de Banco Digital.Será construida uma  RESTful API que permita:

- `Criar` conta bancária
  - Esse endpoint deverá criar uma conta bancária
- `Listar` contas bancárias
  - Esse endpoint deverá lista todas as contas bancárias existentes.
- `Atualizar` os dados do usuário da conta bancária
  - Esse endpoint deverá atualizar uma conta existente
- `Excluir` uma conta bancária
  - Esse endpoint deve excluir uma conta bancária existente.
- `Depósitar` em uma conta bancária
  - Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.
- `Sacar` de uma conta bancária
  - Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.
- `Transferir` valores entre contas bancárias
  - Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.
- `Consultar` saldo da conta bancária
  - Esse endpoint deverá retornar o saldo de uma conta bancária.
- `Emitir` extrato bancário
  - Esse endpoint deverá listar as transações realizadas de uma conta específica.

### Persistências dos dados

  Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "Cubos123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```

## 2 - Endpoints  

1. **CONTAS**

- #### `GET` {host}/contas?senha_banco=Cubos123Bank

- #### `POST` {host}/contas

- #### `PUT` {host}/contas/:numeroConta/usuario

- #### `DELETE` {host}/contas/:numeroConta

1. **TRANSAÇÕES**

- #### `POST` {host}/transacoes/depositar

- #### `POST` {host}/transacoes/sacar

- #### `POST` {host}/transacoes/transferir

- #### `GET` {host}/contas/saldo?numero_conta=123&senha=123

- #### `GET` {host}/contas/extrato?numero_conta=123&senha=123

## 3 - Script da Collection Postman

A collection **`Conta Bancária`** será encontrada em:
`src/scripts/contaBancaria.json`
. Importe através do postamn e faça uso.

## 4 - Protótipos de tela

#### Criando uma conta

![Alt text]( src/assets/imagens/image-1.png)

#### Consultando contas cadastradas

![Alt text]( src/assets/imagens/image-2.png)

#### Atualizando uma conta

![Alt text]( src/assets/imagens/image-3.png)

#### Extrato de uma conta

![Alt text]( src/assets/imagens/image-4.png)

## 6 - Estrutura de Arquivos

![Alt text](src/assets/imagens/image.png)

## 5 - Autor

#### E-mail: <edilson_brandaojunior@hotmail.com>

#### Linkedin: <https://www.linkedin.com/in/juniorbrandao/>
