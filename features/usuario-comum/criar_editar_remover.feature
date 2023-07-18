Feature: Usuário Comum
  As a Usuário comum
  I want to criar, remover e editar meu cadastro
  so that eu possa gerenciar meu cadastro no sistema

  Scenario: Criação de usuário comum bem-sucedida
    Given Estou na página "Criação de Usuário"
    And Não existe um usuário com e-mail "hbp@cin.ufpe.br"
    When Eu preencho o formulário de cadastro com nome "Heitor", e-mail "hbp@cin.ufpe.br", login "Hbprado" e senha "1234"
    And Seleciono a opção "Submeter"
    Then Eu vejo a mensagem de confirmação "Usuário criado com sucesso"

  Scenario: Criação de usuário comum com e-mail já cadastrado
    Given Estou na página "Criação de Usuário"
    And Possuo um cadastro no sistema com e-mail "hbp@cin.ufpe.br"
    When Eu preencho o formulário de cadastro com nome "Heitor", e-mail "hbp@cin.ufpe.br", login "Hbprado" e senha "1234"
    And Seleciono a opção "Submeter"
    Then Eu recebo a mensagem de erro "Esse e-mail já está cadastrado"
    And Meu usuário com nome "Heitor", e-mail "hbp@cin.ufpe.br", login "Hbprado" e senha "1234" não será criado

  Scenario: Criação de usuário comum com e-mail inválido
    Given Estou na página "Criação de Usuário"
    And Não existe um usuário com e-mail "hbp@cin.ufpe.br"
    When Eu preencho o formulário de cadastro com e-mail "hbp.cin.ufpe.br"
    Then Eu recebo a mensagem de erro "e-mail inválido"
    And Meu usuário com e-mail "hbp.cin.ufpe.br" não será criado

  Scenario: Edição de senha de usuário comum bem-sucedida
    Given Estou logado no sistema como usuário comum
    And Estou na página "Edição de Usuário"
    And Vejo meu cadastro com nome "Heitor", login "Hbprado", e-mail "hbp@cin.ufpe.br" e senha "1234"
    When Eu seleciono a opção "Editar usuário"
    And Coloco uma nova senha "5678"
    Then Eu recebo uma mensagem de confirmação "Sua senha foi alterada"
    And Eu vejo meu cadastro com a senha "5678"

  Scenario: Remoção de usuário comum bem-sucedida
    Given Estou logado no sistema como usuário comum
    And Estou na página "Remover Usuário"
    And Vejo meu cadastro com nome "Heitor", login "Hbprado", e-mail "hbp@cin.ufpe.br" e senha "1234"
    When Eu seleciono a opção "Remover minha conta"
    Then Recebo uma mensagem de confirmação "Conta removida com sucesso"
    And Sou redirecionado para a página "Home"