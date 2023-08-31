import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from 'backend/src/content/content.service';
import { PrismaService } from 'backend/src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const feature = loadFeature('tests/features/test-remove_content.feature');

defineFeature(feature, (test) => {
  let contentService;
  let prismaService;
  let exceptionThrown;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService, PrismaService],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  test('Remover conteúdo existente', ({ given, when, then }) => {
    given(/^um conteúdo com ID (\d+) existe$/, async (idToRemove) => {
        // Implement your mock logic here, possibly by using the Prisma mock
        await prismaService.content.create({
            data: {
              id: idToRemove,
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
        const newMockContent = await prismaService.content.findUnique({ where: { id: idToRemove } });
        expect(newMockContent).toEqual(null);
    });

    then(/^a resposta deve conter a mensagem "([^"]*)"$/, (expectedMessage) => {
      const response = contentService.getResponse(); // Get the response from your service
      expect(response.message).toBe(expectedMessage);
    });
  });

  test('Remover conteúdo inexistente', ({ given, when, then }) => {
    given(/^que não existe conteúdo com o ID (\d+)$/, async (idToRemove) => {
      // Implement logic to ensure no content with the provided ID exists in the mock or database
      const mockContent = await prismaService.content.findUnique({ where: { idToRemove } });
      expect(mockContent).toEqual(null);
    });

    when(/^eu tentar remover o conteúdo com o ID (\d+)$/, async (idToRemove) => {
      try {
        await contentService.removeContent(idToRemove);
      } catch (e) {
        exceptionThrown = e;
      }
    });

    then(/^deve ser lançada uma NotFoundException com a mensagem "([^"]*)"$/, (expectedMessage) => {
      expect(exceptionThrown).toBeInstanceOf(NotFoundException);
      expect(exceptionThrown.message).toBe(expectedMessage);
    });
  });

  // More tests for other scenarios...
});
