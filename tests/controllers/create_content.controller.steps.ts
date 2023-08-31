import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('tests/features/test-create_content.feature')

defineFeature(feature, (test) => {

    beforeEach(()=> {

    });

    test('Criação de Filme', ({given, when, then, and})=>{
        given(/^que um usuário autenticado com id "(.*)"$/, (id) =>{

        })
        when(/^uma solicitação POST é enviada para "(.*)" com informações válidas sobre um filme \(título: "(.*)", duração: "(.*)", gênero: "(.*)", diretor: "(.*)"\)$/,
         (url, titulo, duração, gênero, diretor)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and("o corpo da resposta deve conter o filme criado", ()=>{
        });
    });

    test('Obter todos os Conteúdos', ({ given, when, then, and })=>{
        given('que existem conteúdos disponíveis na base de dados', () =>{

        })
        when(/^uma solicitação GET é enviada para "(.*)"$/,
         (url)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and("o corpo da resposta deve conter uma lista de conteúdos", ()=>{
        });
    });

    test('Obter Conteúdo por ID', ({ given, when, then, and })=>{
        given(/^que um conteúdo com id "(.*)" existe na base de dados$/, (id) =>{

        })
        when(/^uma solicitação GET é enviada para "(.*)"$/,
         (url)=> {

        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        });
        and(/^o corpo da resposta deve conter as informações detalhadas do conteúdo com id "(.*)"$/, (id) =>{
        });
    });
});