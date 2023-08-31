Feature: Conteudo

    As a Usuário Comum
    I want to descobrir onde um determinado título está disponível para assistir
    So that eu possa assistir e avaliar no programa

    # Scenario: Nenhum dado disponível sobre a pesquisa
    #     Given não existe um filme no banco de dados com id '1'
    #     When a função 'getAvailabilityByContentId' é chamada com o parâmetro '1'
    #     Then recebo a excessão 'NotFoundException'

    # Scenario: Filme pesquisado não disponível na região
    #     Given o filme 'The Wall' tem dados no banco de dados
    #     And o id do filme é '2'
    #     And o atributo 'plataform' é nulo
    #     When a função 'getAvailabilityByContentId' é chamada com o parâmetro '2'
    #     Then recebo a excessão 'Filme não disponível na região'

    # Scenario: Filme pesquisado disponível em algum streaming
    #     Given o filme 'Django Livre' tem dados no banco de dados
    #     And o id do filme é '3'
    #     And o atributo 'plataform' é 'Netflix'
    #     When a função 'getAvailabilityByContentId' é chamada com o parâmetro '3'
    #     Then retorno ao usuário que o filme está disponível na Netflix
    
    Scenario: Filme pesquisado disponível em algum streaming
        Given um filme 'Django Livre'
        When Eu pesquiso pelo filme
        Then Recebo onde o filme está disponível