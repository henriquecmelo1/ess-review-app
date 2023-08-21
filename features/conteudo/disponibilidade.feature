Feature: Conteúdo
  As a Usuário Comum
  I want to Descobrir onde um determinado título está disponível para assistir
  So that Eu possa assistir e avaliar no programa
  
  
  Scenario: Nenhum dado disponível sobre a pesquisa
    Given Estou na página "Pesquisar"
    And Não tem nenhuma informação sobre "Matrix" na base de dados
    When Pesquiso por "Matrix"
    Then O sistema procura por "Matrix" na base de dados
    And Não acha nenhum dado sobre "Matrix"
    And O programa informa ao usuário que não há nenhum dado disponível sobre "Matrix"

  Scenario: Filme pesquisado não disponível na região
    Given Estou na página "Pesquisar"
    And Na base de dados consta que o filme "The Wall" não está disponível na região do usuário
    When Pesquiso por "The Wall"
    Then O sistema procura por "The Wall" na base de dados
    And O programa informa ao usuário que "The Wall" não está disponível para a região

  Scenario: Filme pesquisado em cartaz nos cinemas
    Given Estou na página "Pesquisar"
    And Na base de dados consta que o filme "Indiana Jones Relíquia do Destino" está disponível nos cinemas
    When Pesquiso por "Indiana Jones Relíquia do Destino"
    Then O sistema procura por "Indiana Jones Relíquia do Destino" na base de dados
    And O programa informa ao usuário que "Indiana Jones Relíquia do Destino" está disponível nos cinemas

  Scenario: Filme pesquisado disponível em algum streaming
    Given Estou na página "Pesquisar"
    And Na base de dados consta que o filme "Django Livre" está disponível na "Netflix"
    When Pesquiso por "Django Livre"
    Then O sistema procura por "Django Livre" na base de dados
    And O programa informa ao usuário que ele pode assistir "Django Livre" na "Netflix"
