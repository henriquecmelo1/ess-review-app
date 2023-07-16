Feature: Conteúdo
  As a Usuário comum
  I want to fazer cadastro de conteúdo dos principais filmes
  so that eu posso alimentar o sistema com conteúdos para outros usuários compartilharem os reviews

  Background: Estou logado como Usuário comum

  Scenario: Cadastro de um filme novo bem-sucedido
    Given Estou na página "Cadastro de Conteúdo"
    And O filme "Interestelar" não existe no sistema
    When Eu seleciono a opção "Cadastrar novo filme"
    And Preencho o formulário com nome "Interestelar", gênero "Ficção Científica" e ano "2014"
    Then Recebo a mensagem de confirmação "Filme Cadastrado!"
    And Vejo o filme "Interestelar" na lista de filmes cadastrados

  Scenario: Cadastro de um filme já existente
    Given Estou na página "Cadastro de Conteúdo"
    And Vejo o filme "Interestelar" na "Lista de filmes"
    When Eu seleciono a opção "Cadastrar novo filme"
    And Preencho o formulário com nome "Interestelar", gênero "Ficção Científica" e ano "2014"
    Then Recebo a mensagem de erro "O filme já existe!"
    And O formulário é limpo para receber novos dados

  Scenario: Cadastro de conteúdo novo de filme existente
    Given Estou na página "Cadastro de Conteúdo"
    And O filme "Interestelar" existe no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Interestelar" na lista de filmes cadastrados
    And Preencho o formulário com diretor "Christopher Nolan" e duração "165 min"
    Then Recebo a mensagem de confirmação "Conteúdo cadastrado!"
    And Vejo os conteúdos "Christopher Nolan" e duração "165 min" associados ao filme "Interestelar"

  Scenario: Cadastro de conteúdo existente de filme existente
    Given Estou na página de "Cadastro de Conteúdo"
    And Os conteúdos diretor "Christopher Nolan" e duração "165 min" já existem no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Interestelar" na lista de filmes cadastrados
    And Preencho o formulário com diretor "Steven Spielberg" e duração "185 min"
    Then Recebo a mensagem de erro "Conteúdo já existente!"
    And Os conteúdos diretor "Steven Spielberg" e duração "185 min" não serão cadastrados

  Scenario: Cadastro de conteúdo em um filme não existente
    Given Estou na página de "Cadastro de Conteúdo"
    And O filme "Pulp Fiction" não existe no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Pulp Fiction" na lista de filmes cadastrados
    And Preencho o formulário com diretor "Quentin Tarantino" e duração "154 min"
    Then Recebo a mensagem de erro "Filme não encontrado!"
    And O conteúdo diretor "Quentin Tarantino" e duração "154 min" não será cadastrado

  Scenario: Cadastro de conteúdo com dados inválidos
    Given Estou na página de "Cadastro de Conteúdo"
    And O filme "Interestelar" existe no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Interestelar" na lista de filmes cadastrados
    And Preencho o formulário com diretor "@#$%" e duração "ABC"
    And Eu seleciono a opção "Cadastrar"
    Then Recebo a mensagem de erro "Por favor, verifique os dados informados."
    And Os conteúdos diretor "@#$%" e duração "ABC" não serão cadastrados.