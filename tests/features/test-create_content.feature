Feature: Funcionalidades de Conteúdo (Filmes)

    Scenario: Criação de Filme
        Given que um usuário autenticado com id "11"
        When uma solicitação POST é enviada para "/content" com informações válidas sobre um filme (título: "Interestelar", duração: "120min", gênero: "Ficção Científica", diretor: "Christopher Nolan")
        Then o status da resposta deve ser "201 Created"
        And o corpo da resposta deve conter o filme criado

    Scenario: Obter Conteúdos
        Given que existem conteúdos na base de dados
        When uma solicitação GET é enviada para "/content"
        Then o status da resposta deve ser "200 OK"
        And o corpo da resposta deve conter as informações detalhadas dos conteúdos

