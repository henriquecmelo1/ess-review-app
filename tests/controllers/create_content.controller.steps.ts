import { INestApplication, ValidationPipe } from "@nestjs/common"
import { loadFeature, defineFeature } from 'jest-cucumber';
import { AppModule } from '../../backend/src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../../backend/src/prisma/prisma.service';
import { Test } from "@nestjs/testing";
import { AuthDto } from "../../backend/src/auth/dto";
import { CreateContentDto } from "../../backend/src/content/dto";

const feature = loadFeature('tests/features/test-create_content.feature');
defineFeature(feature, (test) => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile(); 

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService)
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000')
  });

  afterAll(async () => {
    await app.close();
  });

  test('Criação de Filme', ({ given, when, then, and }) => {

    given(/^que um usuário autenticado com id "11"$/, ()=>{
      const dto: AuthDto = {
      email: 'rgsa@cin.ufpe.br',
      password: '123',
      username: 'renan',
    }
      return pactum 
      .spec()
      .post('/auth/signup')
      .withBody(dto)
      .expectStatus(201)
      .stores('userAt', 'access_token');
    })
    when(
      /^uma solicitação POST é enviada para "(.*)" com informações válidas sobre um filme \(título: "(.*)", duração: "(.*)", gênero: "(.*)", diretor: "(.*)"\)$/,
      async () => {
       const dto: CreateContentDto ={
        title: 'Oppeinheimer',
        duration: 120,
        genre: 'Ficção',
        director: 'Christopher Nolan',
       }
       return pactum
       .spec()
       .post('/contents')
       .withHeaders({
        Authorization: 'Bearer $S{userAt}' 
        })
       .withBody(dto)
       .expectStatus(201)
       .stores('contentId', 'id')
      }
    );
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
    });
    and('o corpo da resposta deve conter o filme criado', () => {
    });
  });

  test('Obter Conteúdos', ({ given, when, then, and }) => {

    given('que existem conteúdos na base de dados', () => {
      return pactum
      .spec()
      .get('/contents')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      })
      .expectStatus(200)
      .expectJsonLength(1);
    });

    when(/^uma solicitação GET é enviada para "(.*)"$/, async () => {
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
    });
    and('o corpo da resposta deve conter as informações detalhadas dos conteúdos', () => {
    });
  });
});
