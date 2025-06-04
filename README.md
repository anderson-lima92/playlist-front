# Documentação da Interface

A interface tem como objetivo permitir o gerenciamento de playlists musicais. As funcionalidades disponíveis incluem:

- **Criar uma playlist**: Permite o registro de uma nova playlist com uma ou mais músicas.
- **Buscar todas as playlists**: Lista todas as playlists registradas.
- **Buscar uma playlist por nome**: Permite consultar uma playlist específica pelo seu nome.
- **Deletar uma playlist**: Remove uma playlist existente com base em seu nome.

## Tecnologias Utilizadas

- Angular 12.0.1
- Angular Material 12.0.5
- TypeScript 4.2.3
- RxJS ~6.6.0
- HTML e SCSS
- HTTPClient com autenticação JWT

## Configuração do Projeto

Esta interface consome uma API protegida por autenticação JWT. Para funcionar corretamente, é necessário que o token JWT esteja salvo no `sessionStorage` com a chave `authToken`.

Além disso, a interface busca os gêneros musicais através de uma chamada para o endpoint `/generos`. Caso não obtenha resposta, será utilizada uma lista de gêneros padrão.

## Executando a Aplicação

Para executar a aplicação, utilize os comandos abaixo:

```bash
# Instalar as dependências
npm install --force

# Iniciar o servidor local
npm run start

O projeto será servido em:
http://localhost:4200

após esses passos siga as instruções da aplicação backend
https://github.com/anderson-lima92/playlist/blob/main/README.md