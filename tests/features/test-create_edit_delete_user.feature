Feature: Funcionalidades de Usuário

    Scenario: Criação de Usuário Válido
        Given um usuário fornece informações válidas (email: "hbp@ufpe.br", username: "hbprado", password: "senha123")
        When uma solicitação POST é enviada para "/auth/signup"
        Then o status da resposta deve ser "201 Created"
        And o corpo da resposta deve conter o usuário criado

    Scenario: Edição de Perfil de Usuário
        Given que um usuário é autenticado com id "123"
        When uma solicitação PATCH é enviada para "/users"
        Then o status da resposta deve ser "200 OK"
        And o corpo da resposta deve conter o perfil de usuário atualizado

    Scenario: Remoção de Conta de Usuário
        Given que um usuário é autenticado com id "456"
        When uma solicitação DELETE é enviada para "/users"
        Then o status da resposta deve ser "204 No Content"
        And a conta de usuário com id "456" deve ser removida do banco de dados