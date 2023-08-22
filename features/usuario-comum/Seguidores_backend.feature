Scenario: Checar se um usuário está seguindo outro
Given O usuário 'user' com id '1'
And Quero checar se o usuário 'follower' com id '2' segue 'user'
And O usuário 'user' segue 'follower'
When Chamo a função 'isFollowing' 
And Preencho os campos 'followerId' e 'following' respectivamente com '2' e '1'
Then É retornado 'true'

Scenario: Parar de seguir um usuário
Given O usuário 'user' com id '2'
And 'user' quer parar de seguir o usuário 'following' com id '1'
When Chamo a função 'followUser'
And Preencho os campos 'followerId' e 'followingId' com '2' e '1' respectivamente
Then Confirmo que 'user' não segue mais 'following'


Scenario: Ver a lista de seguidores
Given O usuário 'user' de id '1' é seguido por 'following1' e 'following2' de id '2' e '3' respectivamente
And Quero ver a lista de seguidores de 'user'
When Chamo a função 'getFollowers'
And Preencho o campo 'userId' com '1'
Then É retornado '[{id:2, username: following1}, {id:3, username: following2}]'

Scenario: Ver a lista de seguindo
Given O usuário 'user' de id '1' segue 'following1' e 'following2' de id '2' e '3' respectivamente
And Quero ver a lista de seguindo de 'user'
When Chamo a função 'getFollowing'
And Preencho o campo 'userId' com '1'
Then É retornado '[{id:2, username: following1}, {id:3, username: following2}]'