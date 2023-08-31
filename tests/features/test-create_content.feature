Feature: Funcionalidades de Conteúdo (Filmes)

    Scenario: Criação de Filme
        Given que um usuário autenticado com id "789"
        When uma solicitação POST é enviada para "/content" com informações válidas sobre um filme (título: "Interestelar", duração: "120min", gênero: "Ficção Científica", diretor: "Christopher Nolan")
        Then o status da resposta deve ser "201 Created"
        And o corpo da resposta deve conter o filme criado

    Scenario: Obter todos os Conteúdos
        Given que existem conteúdos disponíveis na base de dados
        When uma solicitação GET é enviada para "/content"
        Then o status da resposta deve ser "200 OK"
        And o corpo da resposta deve conter uma lista de conteúdos

    Scenario: Obter Conteúdo por ID
        Given que um conteúdo com id "987" existe na base de dados
        When uma solicitação GET é enviada para "/content/987"
        Then o status da resposta deve ser "200 OK"
        And o corpo da resposta deve conter as informações detalhadas do conteúdo com id "987"