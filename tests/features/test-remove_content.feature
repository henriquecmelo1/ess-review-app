Feature: Remover Conteúdo

  Scenario: Remover conteúdo existente
    Given um conteúdo com ID 1 existe
    When o conteúdo com o ID 1 é removido
    Then o conteúdo com ID 1 deve ser removido
    And a resposta deve conter a mensagem "Conteúdo com ID 1 foi removido"

  Scenario: Remover conteúdo inexistente
    Given que não existe conteúdo com o ID 2
    When eu tentar remover o conteúdo com o ID 2
    Then deve ser lançada uma NotFoundException com a mensagem "Conteúdo com ID 2 não encontrado"

  # Scenario: Remover conteúdo inexistente
  #   Given que não existe conteúdo com o ID 2
  #   When a função removeContent for chamada com o ID 2
  #   Then uma NotFoundException deve ser lançada com a mensagem "Conteúdo com ID 2 não encontrado"

  # Scenario: Remover conteúdo existente
  #   Given um conteúdo com ID "1" existe
  #   When uma solicitação DELETE é enviada para "/content/1"
  #   Then o status da resposta deve ser "204 No Content"
  #   And o corpo da resposta deve conter a mensagem "Conteúdo com ID 1 foi removido"
