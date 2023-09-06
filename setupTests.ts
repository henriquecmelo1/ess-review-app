import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from './backend/src/prisma/prisma.service';
import { AppModule } from './backend/src/app.module';
import { Test, TestingModule } from "@nestjs/testing"; 

let app: INestApplication;
let prisma: PrismaService;

export { app, prisma };
