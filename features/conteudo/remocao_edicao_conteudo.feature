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

Scenario: Remoção de conteúdo da plataforma
  Given Estou na página de um filme que não existe
  And Quero remover o filme da plataforma
  When Eu seleciono a opção "Editar"
  And vou até o final da página
  And seleciono a opção "Remover"
  Then Recebo a mensagem de confirmação "Conteúdo Removido!"

Scenario: Edição de conteúdo falha por não achar dados corretos
  Given Estou na página do filme "Inception"
  And Na página do filme o campo de gênero está vazio
  And Eu quero preencher o campo de gênero com um algo que não faz parte dos gêneros comuns
  When Eu seleciono a opção "Editar"
  And Preencho o campo de gênero com um gênero que não está cadastrado
  Then O programa pesquisa na base de dados pelo gênero
  And O programa não encontra o gênero na base de dados
  And O programa retorna uma mensagem de erro "Gênero não encontrado" 
  
Scenario: Completar cadastro de um filme
  Given Estou na página do filme "Barbie"
  And Nas informações do filme está faltando a direção
  And Quero completar o cadastro do filme
  When Eu seleciono a opção "Editar"
  And Preencho o campo de direção com o nome "Greta Gerwig"
  Then Recebo a mensagem de confirmação "Cadastro Alterado!"

  





