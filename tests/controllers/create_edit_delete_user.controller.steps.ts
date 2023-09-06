import { INestApplication, ValidationPipe } from "@nestjs/common"
import { loadFeature, defineFeature } from 'jest-cucumber';
import { AppModule } from '../../backend/src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../../backend/src/prisma/prisma.service';
import { Test } from "@nestjs/testing";
import { AuthDto } from "../../backend/src/auth/dto";
import { EditUserDto } from "../../backend/src/user/dto";
const feature = loadFeature('tests/features/test-create_edit_delete_user.feature');

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


  test('Criação de Usuário Válido', ({ given, when, then }) => {
 

    given(/^um usuário fornece informações válidas \(email: "(.*)", username: "(.*)", password: "(.*)"\)$/, (email, username, password) => {
      const dto: AuthDto = {
        email: 'hbp@cin.ufpe.br',
        username: 'hbprado',
        password: '1234'
      }
      return pactum
      .spec()
      .post('/auth/signup')
      .withBody(dto)
      .expectStatus(201)
      .stores('userAt', 'access_token')
    });

    when(/^uma solicitação POST é enviada para "(.*)"$/, async () => {
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
    });
    then('o corpo da resposta deve conter o usuário criado', () => {
    });
  });

  test('Edição de Perfil de Usuário', ({ given, when, then }) => {
    given(/^que um usuário é autenticado com id "(.*)"$/, (id) => {
      const dto: EditUserDto = {
        username: 'heitcho',
      }
      return pactum
      .spec()
      .patch('/users')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      })
      .withBody(dto)
      .expectStatus(200)
      .expectBodyContains(dto.username)
    }); 
    when(/^uma solicitação PATCH é enviada para "(.*)"$/, async (url) => {
    });
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
    });
    then('o corpo da resposta deve conter o perfil de usuário atualizado', () => {
    });
  });

  test('Remoção de Conta de Usuário', ({ given, when, then }) => {
    given(/^que um usuário é autenticado com id "(.*)"$/, () => {
      return pactum
      .spec()
      .delete('/users/{id}')
      .withPathParams('id', '$S{userId}')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}',
      })
      .expectStatus(200);
    });
    when(/^uma solicitação DELETE é enviada para "(.*)"$/, async () => {
    });
    then(/^o status da resposta deve ser "(.*)"$/, () => {
    });
    then(/^a conta de usuário com id "(.*)" deve ser removida do banco de dados$/, () => {
    });
  });
});
