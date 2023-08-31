import { loadFeature, defineFeature } from 'jest-cucumber';
import { PrismaService } from '../../backend/src/prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient as OriginalPrismaClient } from '@prisma/client';
import { ContentService } from '../../backend/src/content/content.service';
import { ContentController } from '../../backend/src/content/content.controller';
import * as request from 'supertest';
import { AppModule } from '../../backend/src/app.module';
import { NestFactory } from '@nestjs/core';

jest.mock('@prisma/client', () => ({
    PrismaClient: function () {
        return mockDeep<OriginalPrismaClient>();
    },
}));

const feature = loadFeature('tests/features/test-create_content.feature')

defineFeature(feature, (test) => {
    let contentService: ContentService;
    let prismaMock: OriginalPrismaClient;
    let response: request.Response;
    let app; 
    beforeAll(async () => {
        prismaMock = new OriginalPrismaClient();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContentController],
            providers: [
                ContentService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                }
            ]
        }).compile();
        
        contentService = module.get<ContentService>(ContentService);

        app = await NestFactory.create(AppModule); // Criação da instância do app
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });

    test('Criação de Filme', ({given, when, then, and})=>{
        let userId: number;
        let movieInfo: any;
        given(/^que um usuário autenticado com id "(.*)"$/, (id) =>{
            userId = id;
            prismaMock.user.findUnique = jest.fn().mockResolvedValue({id: userId});
        })
        when(/^uma solicitação POST é enviada para "(.*)" com informações válidas sobre um filme \(título: "(.*)", duração: "(.*)", gênero: "(.*)", diretor: "(.*)"\)$/,
        async (url, titulo, duracao, genero, diretor)=> {
            movieInfo = { title: titulo, duration: duracao, genre: genero, director: diretor};
            prismaMock.content.create = jest.fn().mockResolvedValueOnce({id: '1', ...movieInfo})
            response = await request(app)
                .post('/content')
                .send(movieInfo)
                .expect(201);
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
        and("o corpo da resposta deve conter o filme criado", ()=>{
            expect(response.body).toEqual({id:'1', ...movieInfo});
        });
    });

    test('Obter todos os Conteúdos', ({ given, when, then, and })=>{
        let contentList: any[];
        given('que existem conteúdos disponíveis na base de dados', () =>{
            contentList = [{id: '1', title: 'Interestelar'}, {id: '2', title: 'Barbie'}]
            prismaMock.content.findMany = jest.fn().mockResolvedValueOnce(contentList);
        })
        when(/^uma solicitação GET é enviada para "(.*)"$/,
         async ()=> {
            response = await contentService.getContent(1);
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(200);
        });
        and("o corpo da resposta deve conter uma lista de conteúdos", ()=>{
            expect(response.body).toEqual(contentList);
        });
    });

    test('Obter Conteúdo por ID', ({ given, when, then, and })=>{
        let contentId: number;
        let contentDetails: any;
        given(/^que um conteúdo com id "(.*)" existe na base de dados$/, (id) =>{
            contentId = id;
            contentDetails = {id: contentId, title: 'Interestelar', duration: '120min'}
            prismaMock.content.findUnique = jest.fn().mockResolvedValueOnce(contentDetails);
        })
        when(/^uma solicitação GET é enviada para "(.*)"$/,
         async ()=> {
            response = await contentService.getContentById(1,contentId);
        });
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(200);
        });
        and(/^o corpo da resposta deve conter as informações detalhadas do conteúdo com id "(.*)"$/, (id) =>{
            expect(response.body).toEqual(contentDetails);
        });
    });
});