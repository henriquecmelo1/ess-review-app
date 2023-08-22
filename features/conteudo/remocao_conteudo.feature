Feature: Conteúdo
  As a Usuário Comum
  I want to Alterar informações que estejam incorretas na plataforma
  So that A plataforma não contenha informações falsas

Scenario: Remoção de conteúdo da plataforma
  Given Estou na página de um filme que não existe
  And Quero remover o filme da plataforma
  When Eu seleciono a opção "Editar"
  And seleciono a opção "Remover"
  Then Recebo a mensagem de confirmação "Conteúdo Removido!" 
  


  





