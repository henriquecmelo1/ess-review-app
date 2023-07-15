Feature: Seguidores

    Scenario: Seguir um usuário
        Given Estou conectado na minha conta "Mader"
        And Não sigo o usuário "Diogo"
        When Navego à página do usuário "Diogo"
        And Clico no botão "Seguir"
        Then O botão "Seguir" atualiza para o botão "Parar de seguir"
        And O usuário "Diogo" recebe uma mensagem "Mader começou a seguir você!"

    Scenario: Parar de seguir um usuário
        Given Estou conectado na minha conta "Mader"
        And Sigo o usuário "Diogo"
        When Navego à pagina do usuário "Diogo"
        And Clico no botão "Parar de seguir"
        Then O botão "Parar de seguir" atualiza para o botão "Seguir"
    
    Scenario: Ver lista de seguindo
        Given Estou conectado na minha conta "Mader"
	And Sigo os usuários "Alexandre", "Leonardo diCaprio" e "Diogo"
        And Estou na página "Meu perfil"
        When Clico no botão "Seguindo"
        Then Navego à página "Seguindo"
        And Vejo uma lista com os usuários "Alexandre", "Leonardo diCaprio" e "Diogo"
    
    Scenario: Ver lista de seguidores
        Given Estou conectado na minha conta "Mader"
        And Sou seguido pelos usuários "Alexandre", "Diogo", "Carlos" e "João"
        And Estou na página "Meu perfil"
        When Clico no botão "Seguidores"
        Then Navego à página "Seguidores"
        And Vejo uma lista com os usuários que "Alexandre", "Diogo", "Carlos" e "João"

    
