import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from './backend/src/prisma/prisma.service';
import { AppModule } from './backend/src/app.module';
import { Test, TestingModule } from "@nestjs/testing"; 

let app: INestApplication;
let prisma: PrismaService;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
});

afterEach(async () => {
    await app.close();
});

export { app, prisma };
