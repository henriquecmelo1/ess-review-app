import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from 'backend/src/content/content.service';
import { PrismaService } from 'backend/src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient as OriginalPrismaClient } from '@prisma/client';
import { ContentController } from 'backend/src/content/content.controller';
import * as request from 'supertest';

const feature = loadFeature('tests/features/test-remove_content.feature');

defineFeature(feature, (test) => {
  let contentService: ContentService;
  let prismaMock: OriginalPrismaClient;
  let response: request.Response;
  let app: any;
  let exceptionThrown;
  let id: number;
  beforeEach(async()=> {
      prismaMock = new OriginalPrismaClient();
      const module: TestingModule = await Test.createTestingModule({
          controllers:[ContentController],
          providers: [
              ContentService,
              {
                  provide: PrismaService,
                  useValue: prismaMock,
              }
          ]
      }).compile();
      contentService = module.get<ContentService>(ContentService);
  });

// defineFeature(feature, (test) => {
//   let contentService;
//   let prismaService;
//   let exceptionThrown;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ContentService, PrismaService],
//     }).compile();

//     contentService = module.get<ContentService>(ContentService);
//     prismaService = module.get<PrismaService>(PrismaService);
//   });

  test('Remover conteúdo existente', ({ given, when, then }) => {
    given(/^um conteúdo com ID (\d+) existe$/, async (idToRemove) => {
        // Implement your mock logic here, possibly by using the Prisma mock
        const id = parseInt(idToRemove, 10);
        await prismaMock.content.create({
            data: {
              id: id,
              title: 'mock title',
              duration: 120,
              genre: 'mock genre',
              director: 'mock director',
              userId: 1,
            },
          })
    });

    when(/^o conteúdo com o ID (\d+) é removido$/, async (idToRemove) => {
      try {
        await contentService.removeContent(idToRemove);
      } catch (e) {
        exceptionThrown = e;
      }
    });

    then(/^o conteúdo com ID (\d+) deve ser removido$/, async (idToRemove) => {
      // Implement your assertion logic here, possibly by checking the Prisma mock or database state
        const id = parseInt(idToRemove, 10);
        const newMockContent = await prismaMock.content.findUnique({ where: { id: id } });
        expect(newMockContent).toEqual(null);
    });

    then(/^a resposta deve conter a mensagem "([^"]*)"$/, (expectedMessage) => {
      const response = contentService.removeContent(id); // Get the response from your service
      expect(response).toBe(expectedMessage);
    });
  });

  test('Remover conteúdo inexistente', ({ given, when, then }) => {
    given(/^que não existe conteúdo com o ID (\d+)$/, async (idToRemove) => {
      const id_test = parseInt(idToRemove, 10);
      // Implement logic to ensure no content with the provided ID exists in the mock or database
      const mockContent = await prismaMock.content.findUnique({ where: { id: id_test } });
      expect(mockContent).toEqual(null);
    });

    when(/^eu tentar remover o conteúdo com o ID (\d+)$/, async (idToRemove) => {
      try {
        const id = parseInt(idToRemove, 10);
        await contentService.removeContent(id);
      
      } catch (e) {
        exceptionThrown = e;
      }
    });

    then(/^deve ser lançado um erro com a mensagem "([^"]*)"$/, (expectedMessage) => {
      expect(exceptionThrown.message).toBe(expectedMessage);
      // expect(exceptionThrown).toBeInstanceOf(NotFoundException);
      
    });
  });

  // More tests for other scenarios...
});
