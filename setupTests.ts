import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from './backend/src/prisma/prisma.service';
import { AppModule } from './backend/src/app.module';
import { Test } from "@nestjs/testing"; 
let app: INestApplication;
let prisma: PrismaService;

beforeEach(async () => {
    // TODO: Add any setup code here (e.g. clear DB for tests before each test case)
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(0);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });