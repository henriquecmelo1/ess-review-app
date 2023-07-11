Scenario: Edição de conteúdo de filme existente
  Given Estou na página do filme "Interstelar"
  And Quero corrigir uma informação sobre o filme
  When Eu seleciono a opção "editar"
  And Preencho o formulário com nome "Interstelar", gênero "Ficção Científica" e ano "2014"
  Then Recebo a mensagem de confirmação "Cadastro Alterado!"
  And Vejo que as informações sobre o filme "Interstelar" estão corretas agora



