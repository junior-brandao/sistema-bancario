# API Sistema E-Comerce

###### E-mail: <edilson_brandaojunior@hotmail.com>

###### Linkedin: <https://www.linkedin.com/in/juniorbrandao/>

 Projeto de estudo de criação de api, onde uso as seguinte tecnologias:

[![Java](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=black)](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
[![Apache Maven](https://img.shields.io/badge/apache_maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Intellij](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)](https://www.jetbrains.com/pt-br/idea//)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)](https://www.postman.com/)
[![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

#### Linguagens

        Java jdk 17 

#### Gerenciamento de projetos

       Maven

#### Frameworks

       Springboot, Spring Data JPA, Spring Validation, Spring Cloud, Spring Security, 
       Spring Security Oauth2, Swagger(Documentação)

#### DB

       Em ambiente de testes utilizo o banco de dados H2(em memória),
       e o Postgres em ambiente de desenvolvimento e produção.

### Configurações para inicialização

       Execute o comando: mvn install para instalar as dependências do maven.
       Após baixar as dependências, execute a aplicação e a api estará rodando em http://localhost:8080.
       Acesso ao banco de dados: http://localhost:8080/h2-console.

### Documentação

       A documentação da api foi gerada através do Swagger e pode ser acessada em http://localhost:8080/swagger-ui.html#

### repositório: <https://github.com/junior-brandao/e-commerce>

### 1- Visão geral do sistema
  >
  > O sistema deve manter um cadastro de usuário, produtos e suas categorias. Cada
   usuário possui nome, email, telefone, data de nascimento e uma senha de acesso. Os
   dados dos produtos são: nome, descrição, preço e imagem. O sistema deve apresentar
   um catálogo de produtos, os quais podem ser filtrados pelo nome do produto. A partir
   desse catálogo, o usuário pode selecionar um produto para ver seus detalhes e para
   decidir se o adiciona a um carrinho de compras. O usuário pode incluir e remover itens
   do carrinho de compra, bem como alterar as quantidades de cada item. Uma vez que o
   usuário decida encerrar o pedido, o pedido deve então ser salvo no sistema com o status
   de "aguardando pagamento". Os dados de um pedido são: instante em que ele foi salvo,
   status, e uma lista de itens, onde cada item se refere a um produto e sua quantidade no
   pedido. O status de um pedido pode ser: aguardando pagamento, pago, enviado,
   entregue e cancelado. Quando o usuário paga por um pedido, o instante do pagamento
   deve ser registrado. Os usuários do sistema podem ser clientes ou administradores,
   sendo que todo usuário cadastrado por padrão é cliente. Usuários não identificados
   podem se cadastrar no sistema, navegar no catálogo de produtos e no carrinho de
   compras. Clientes podem atualizar seu cadastro no sistema, registrar pedidos e visualizar
   seus próprios pedidos. Usuários administradores tem acesso à área administrativa onde
   pode acessar os cadastros de usuários, produtos e categorias.

## 2 - Protótipos de tela

<https://www.figma.com/file/ZrGNVNG0kZL6txDv4G8P6s/DSCommerce>

## 3 - Modelo Conceitual

Este é o modelo conceitual do sistema DSCommerce. Considerações:
   Cada item de pedido (OrderItem) corresponde a um produto no pedido, com uma
quantidade. Sendo que o preço também é armazenado no item de pedido por
questões de histórico (se o preço do produto mudar no futuro, o preço do item de
pedido continua registrado com o preço real que foi vendido na época).
   Um usuário pode ter um ou mais "roles", que são os perfis de acesso deste usuário
no sistema (client, admin).

![image](https://github.com/junior-brandao/e-commerce/assets/140202509/6ad23843-fccc-4735-a71f-a98cb470d092)

## 4- Casos de uso (visão geral)

O escopo funcional do sistema consiste nos seguintes casos de uso:

| Caso de uso                                         | Visão geral                                                                                              | Acesso             |
|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------------|
| Manter produtos                                     | CRUD de produtos, podendo filtrar itens pelo nome                                                        | Somente Admin      |
| Manter categorias                                   | CRUD de categorias, podendo filtrar itens pelo nome                                                      | Somente Admin      |
| Manter usuários                                     | CRUD de usuários, podendo filtrar itens pelo nome                                                        | Somente Admin      |
| Gerenciar carrinho                                  | Incluir e remover itens do carrinho de compras, bem  como alterar as quantidades do produto em cada item | Público            |
| Consultar catálogo                                  | Listar produtos disponíveis, podendo filtrar produtos pelo nome                                          | Público            |
| Sign up                                             | Cadastrar-se no sistema                                                                                  | Público            |
| Login                                               | Efetuar login no sistema                                                                                 | Público            |
| Registrar pedido                                    | Salvar no sistema um pedido a partir dos dados do carrinho de compras informado                          | Usuário logado     |
| Visualizar pedidos                                  | Visualizar os pedidos que o próprio usuário já fez                                                       | Usuário logado     |
| Registrar pagamento                                 | Salvar no sistema os dados do pagamento de um pedido                                                     | Somente Admin      |
| Reportar pedidos                                    | Relatório de pedidos, podendo ser filtrados por data                                                     | Somente Admin      |
| Atualizar perfil                                    | Atualizar o próprio cadastro                                                                             | Usuário logado     |

![image](https://github.com/junior-brandao/e-commerce/assets/140202509/2ed5d20d-f271-4c28-83fc-6047ec321a5d)

### Atores

| `Ator`          | `Responsabilidade`                                                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usuário anônimo | Pode realizar casos de uso das áreas públicas do sistema, como catálogo, carrinho de compras, login e sign up                                       |
| Cliente         | Responsável por manter seu próprios dados pessoais no sistema,e pode visualizar histórico dos seus pedidos. Todo usuário cadastrado por padrão é um Cliente |
| Admin           | Responsável por acessar a área administrativa do sistema com cadastros e relatórios. Admin também pode fazer tudo que Cliente faz                           |

## 5 - Features

 1. **AUTH**
    - POST - {{host}}/oauth2/token

 2. **CATEGORIES**
    - GET - {{host}}/categories

 3. **ORDERS**
    - POST - {{host}}/orders
    - GET - {{host}}/orders/1

 4. **PRODUCTS**
    - GET - {{host}}/products
    - GET - {{host}}/products/1
    - POST - {{host}}/products
    - PUT - {{host}}/products/1
    - DELETE - {{host}}/products/1

 5. **USER**
    - GET - {{host}}/users/logged

## 6 - Casos de uso (detalhamento)

   //fazer projeto
