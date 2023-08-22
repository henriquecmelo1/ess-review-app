Feature: Conteúdo
  As a Usuário Comum
  I want to Alterar informações que estejam incorretas na plataforma
  So that A plataforma não contenha informações falsas

Scenario: Remoção de conteúdo da plataforma
  Given Existe um filme falso no banco de dados chamado "mock title"
  And o id desse filme é "1"
  When Eu chamo a função "removeContent" para o id "1"
  Then Confirmo que a função foi chamada para o id "1"
  And Confirmo que o id "1" não guarda mais informações no banco de dados

Scenario: Remoção de conteúdo que não existe no banco de dados
  Given Não existe um filme no no banco de dados com id "-1"
  When Eu chamo a função "removeContent" para o id "-1"
  Then Recebo a excessão "NotFoundException"

Scenario: Edição de conteúdo de filme existente
  Given Existe um filme no banco de dados chamado "Old Title"
  And o id desse filme é "1"
  When Eu chamo a função "updateContent" para o id "1"
  And Preencho o campo "title" com "Updated Title" no UpdateContentDto
  Then Confirmo que a função foi chamada para o id "1" e com o UpdateContentDto
  And Confirmo que o filme com id "1" agora tem o título "Updated Title"

Scenario: Edição de conteúdo de filme que não existe no banco de dados
    Given Não existe um filme no banco de dados com id "-1"
    When Eu chamo a função "updateContent" para o id "-1"
    Then Recebo a excessão "NotFoundException"