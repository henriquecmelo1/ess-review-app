Feature: Conteúdo
  As a Usuário Comum
  I want to Alterar informações que estejam incorretas na plataforma
  So that A plataforma não contenha informações falsas

Scenario: Edição de conteúdo de filme existente
  Given Estou na página do filme "Interstelar"
  And Quero corrigir uma informação sobre o filme
  When Eu seleciono a opção "Editar"
  And Preencho o formulário com nome "Interstelar", gênero "Ficção Científica" e ano "2014"
  Then Recebo a mensagem de confirmação "Cadastro Alterado!"
  And Vejo que as informações sobre o filme "Interstelar" estão corretas agora

Scenario: Remoção de conteúdo da plataforma
  Given Estou na página de um filme que não existe
  And Quero remover o filme da plataforma
  When Eu seleciono a opção "Editar"
  And vou até o final da página
  And seleciono a opção "Remover"
  Then Recebo a mensagem de confirmação "Conteúdo Removido!"
  And O filme não aparece mais na lista de filmes cadastrados

Scenario: Edição de conteúdo falha por não achar dados corretos
  Given Estou na página de um filme com uma informação incorreta
  And Quero corrigir a informação que está incorreta
  When Eu seleciono a opção "Editar"
  And Preencho o campo de gênero com um gênero que não está cadastrado
  Then O programa pesquisa o na base de dados pelo gênero
  And O programa não encontra o gênero na base de dados
  And O programa informa que o gênero preenchido não existe 
  
Scenario: Completar cadastro de um filme
  Given Estou na página de um filme
  And Percebo que nas informações do filme está faltando o diretor
  And Quero completar o cadastro do filme
  When Eu seleciono a opção "Editar"
  And Preencho o campo de diretor no formulário do filme
  Then Recebo a mensagem de confirmação "Cadastro Alterado!"
  And Vejo que as o filme agora conta com a informação de quem o dirigiu
  





