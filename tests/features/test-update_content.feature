Feature: Update Content

  Scenario: Update existing content
    Given um conteúdo com ID "1" existe
    When o conteúdo com ID "1" é atualizado com os seguintes dados: title: "Updated Title", duration: "150", genre: "Updated", director: "New Director"
    Then o conteúdo com id "1" deve ser atualizado com os seguintes dados: title: "Updated Title", duration: "150", genre: "Updated", director: "New Director"


  Scenario: Update non-existing content
    Given que não existe conteúdo com o ID "2"
    When eu tentar atualizar o conteúdo com o ID "2" com os seguintes dados: title: "Updated Title", duration: "150", genre: "Updated", director: "New Director"
    Then deve ser lançada uma mensagem "Content with ID 2 not found"
