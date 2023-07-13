Feature: Conteúdo
  As a Usuário comum
  I want to fazer cadastro de conteúdo dos principais filmes
  so that eu posso alimentar o sistema com conteúdos para outros usuários compartilharem os reviews

  Background Estou logado como Usuário comum

  Scenario: Cadastro de um filme novo bem-sucedido
    Given Estou na página "Cadastro de Conteúdo"
    And Quero cadastrar um filme que não existe no sistema
    When Eu seleciono a opção "Cadastrar novo filme"
    And Preencho o formulário com nome "Interestelar", gênero "Ficção Científica" e ano "2014"
    Then Recebo a mensagem de confirmação "Filme Cadastrado!"
    And Vejo o filme "Interestelar" na lista de filmes cadastrados

  Scenario: Cadastro de um filme já existente
    Given Estou na página "Cadastro de Conteúdo"
    And Já existe o filme que quero cadastrar
    When Eu seleciono a opção "Cadastrar novo filme"
    And Preencho o formulário com nome "Interestelar", gênero "Ficção Científica" e ano "2014"
    Then Recebo a mensagem de erro "O filme já existe!"
    And O filme não será cadastrado

  Scenario: Cadastro de conteúdo novo de filme existente
    Given Estou na página "Cadastro de Conteúdo"
    And O filme que quero cadastrar novos conteúdos já existe no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Interestelar" na lista de filmes cadastrados
    And Preencho o formulário com diretor "Christopher Nolan" e duração "165 min"
    Then Recebo a mensagem de confirmação "Conteúdo cadastrado!"
    And Vejo os conteúdos novos associados ao filme "Interestelar"

  Scenario: Cadastro de conteúdo novo de filme inexistente
    Given Estou na página de "Cadastro de Conteúdo"
    And O filme que quero cadastrar novos conteúdos não existe no sistema
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Procuro o filme "A volta dos que não foram" na lista de filmes cadastrados
    Then Recebo a mensagem de erro "O filme não existe!"

  Scenario: Cadastro de conteúdo existente de filme existente
    Given Estou na página de "Cadastro de Conteúdo"
    And Os conteúdos que quero cadastrar já existem
    When Eu seleciono a opção "Cadastrar novo conteúdo"
    And Eu seleciono o filme "Interestelar" na lista de filmes cadastrados
    And Preencho o formulário com algum conteúdo já existente
    Then Recebo a mensagem de erro "Conteúdo já existente!"
    And Os conteúdos não serão modificados