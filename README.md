# **Requisitos**

## **Viajante**

**REQUISITOS FUNCIONAIS**
- **POST /auth** autenticação do viajante;
- **POST /traveler/create** cadastrar viajante.

**REQUISITOS NÃO FUNCIONAIS**
- Para criar as rotas HTTP será utilizado o express;
- Os dados serão salvos no PostgreSQL;
- Para gerar o jwt será utilizado a biblioteca "**jsonwebtoken**".

**REGRA DE NEGÓCIO**
- O viajante deve ser considerado um usuário;
- Cada viajante deve conter **nickname**, **password**, **e-mail** e **avatar**;
- As informações de **nickname** e **avatar** devem estar visíveis aos demais viajantes, não importando qual planeta e galáxia ele se encontra;
- Para que o viajante consiga acessar as galáxias é necessário estar autenticado através de seu **e-mail** e **senha**.
- Para autenticar o usuário será utilizado o JWT contendo uma criptografia assimétrica, uma chave privada para gerar os tokens e uma pública para verificar a autenticidade do token gerado.
- Ao autenticar o viajante a aplicação deve retornar um código de status 200 e um corpo de resposta com o token jwt;
- Ao cadastrar o viajante a aplicação deve retorna um status 201 e um corpo de resposta com o token jwt;
- Não deve ser possível autenticar um viajante com um e-mail que não está cadastrado;
- Não deve ser possível autenticar um viajante com o e-mail e password incorreto;
- Não deve ser possível cadastrar um viajante com um e-mail que já existe cadastrado.


## **Galáxia**

**REQUISITOS FUNCIONAIS**
- **GET /galaxy** retorna uma lista com todas as galáxias, planetas e viajantes;
- Cada viajante poderá navegar nas galáxias e planetas que desejar.

**REQUISITOS NÃO FUNCIONAIS**
- Para criar as rotas HTTP será utilizado o express;
- Os dados serão salvos no PostgreSQL;

**REGRA DE NEGÓCIO**
- Pode ter um ou mais **planetas**;
- Cada galáxia deve conter **nome** e **ordenação**.

## **Planeta**

**REQUISITOS FUNCIONAIS**
- **POST /meeting/:planet_id/join** para ingressar na videoconferência do planeta.

**REQUISITOS NÃO FUNCIONAIS**
- Para criar as rotas HTTP será utilizado o express;
- Os dados serão salvos no PostgreSQL;

**REGRA DE NEGÓCIO**
- Cada planeta deve conter **nome**, **galáxia** e **link de videoconferência** para que os viajantes possam encontra-los e interagir;
- Cada planeta deve pertencer unicamente a apenas uma galáxia;
- Um planeta pode conter nenhum ou vários viajantes.

# **Instruções**

## **Ambiente**:
> Instalar as dependências:
```sh
$ yarn
```

> Para iniciar o PostgreSQL, rodar o comando:
```sh
$ docker container run --name shenlong -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=shenlong -p 5432:5432 -d postgres
```

> Rodar as migrations:
```sh
$ yarn typeorm migration:run
```

> Rodar os testes:
```sh
$ yarn test
```

> Rodar o ambiente de desenvolvimento:
```sh
$ yarn dev
```
> Renomear o arquivo ".env.example" para ".env".

## **Aplicação**
A aplicação foi construída utilizando os conceitos de arquitetura limpa, de modo que suas funcionalidades não dependam de recursos terceiros, sendo fácil de testar, fazer modificações em regras de negócio existentes e adicionar novas features.


A pasta **modules**, contém os módulos da aplicação:
- Galaxy
- Planet
- Traveler

Já a pasta **shared**, contém os recursos que devem ser compartilhados entre os módulos.
- container: é responsável por gerenciar as dependências da aplicação, utilizando o tsyringe;
- errors: classe genérica de erros.


Além da divisão de módulos, foi criado a pastra de **infra** que desacopla a aplicação do ORM (TypeORM) que define como deve ser feito a persistência dos dados e do serviço http (express).

Outras pastas da aplicação:
- dtos: modelo de como deve ser passado os objetos;
- providers: contém funcionalidades auxiliares da aplicação, de modo que elas fiquem desacopladas;
- repositories (módulo): contém a interface com os métodos de como um determinado repository deve se comportar;
- repositories (infra/typeorm): contém a classe com a implementação dos métodos que serão utilizados para a interação com o banco de dados;
- services: contém as regras de negócio da aplicação;
- controller: realiza a interação com o service, contém a funcionalidade da rota;
- routes: rotas da aplicação;
- fakes: implementações fakes para realização dos testes;
- @types: tipos personalizados para o typescript;
- config: configurações.

> Para padronização do código foram utilizado as seguintes ferramentas:
- prettier e eslint.
> Para padronização dos commits:
- commitizen, commitlint e husky.

### Caso deseje gerar suas próprias chaves assimétricas, utilizar o comando:
```sh
$ openssl genrsa -out private-key.pem 2048
$ openssl rsa -in private-key.pem -pubout -out public-key.pem
```

Copiar as chaves para o arquivo .env, lembrando que os espaços devem ser substituídos por "\n".
