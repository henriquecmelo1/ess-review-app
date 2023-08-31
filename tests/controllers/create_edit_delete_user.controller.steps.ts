import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('tests/features/test-create_content.feature')

defineFeature(feature, (test) => {

    beforeEach(()=> {

    });

    test('Criação de Usuário Válido', ({given, when, then, and})=>{
        given(/^um usuário fornece informações válidas \(email: "(.*)", username: "(.*)", password: "(.*)"\)$/,
         (email, username, password) =>{

        })
        when(/^uma solicitação POST é enviada para "(.*)" $/, (url)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and("o corpo da resposta deve conter o usuário criado", ()=>{
        });
    });

    test('Edição de Perfil de Usuário', ({ given, when, then, and })=>{
        given(/^um usuário é autenticado com id "(.*)"$/, (id) =>{

        })
        when(/^uma solicitação PATCH é enviada para "(.*)"$/,
         (url)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and("o corpo da resposta deve conter o perfil de usuário atualizado", ()=>{

        });
    });

    test('Remoção de Conta de Usuário', ({ given, when, then, and })=>{
        given(/^um usuário é autenticado com id "(.*)"$/, (id) =>{

        })
        when(/^uma solicitação DELETE é enviada para "(.*)"$/,
         (url)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and(/^a conta de usuário com id "(.*)" deve ser removida do banco de dados$/, (id) =>{
        });
    });
});