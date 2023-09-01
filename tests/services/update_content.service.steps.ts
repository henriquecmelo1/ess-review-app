import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from 'backend/src/content/content.service';
import { PrismaService } from 'backend/src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaClient as OriginalPrismaClient } from '@prisma/client';
import { UpdateContentDto } from 'backend/src/content/dto';

const feature = loadFeature('tests/features/test-update_content.feature');

defineFeature(feature, (test) => {
  let contentService: ContentService;
  let prismaMock: OriginalPrismaClient;
  let exceptionThrown: Error;
  let updatedContent: any;
  let updateData: UpdateContentDto;
  
  beforeEach(async () => {
    prismaMock = new OriginalPrismaClient();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    contentService = module.get<ContentService>(ContentService);
  });

  test('Update existing content', ({ given, when, then }) => {
    given(/^um conteúdo com ID "(.*)" existe$/, async (idToUpdate) => {
      // Implement your mock logic here to create existing content
      const id = parseInt(idToUpdate, 10);
      await prismaMock.content.create({
        data: {
          id: id,
          title: 'mock title',
          duration: 120,
          genre: 'mock genre',
          director: 'mock director',
          userId: 1,
        },
      });
    });

    when(/^o conteúdo com ID "(.*)" é atualizado com os seguintes dados: title: "(.*)", duration: "(.*)", genre: "(.*)", director: "(.*)"$/, async (idToUpdate, new_title, new_duration, new_genre, new_director) => {
      updateData = {
        title: new_title,
        duration: parseInt(new_duration, 10),
        genre: new_genre,
        director: new_director,
      }; // Assuming your step passes a table with update data
      try {
        updatedContent = await contentService.updateContent(parseInt(idToUpdate, 10), updateData);
      } catch (e) {
        exceptionThrown = e;
      }
    });

    then(/^o conteúdo com id "(.*)" deve ser atualizado com os seguintes dados: title: "(.*)", duration: "(.*)", genre: "(.*)", director: "(.*)"$/, (idToUpdate, new_title, new_duration, new_genre, new_director) => {
      updateData = {
        title: new_title,
        duration: parseInt(new_duration, 10),
        genre: new_genre,
        director: new_director,
      };
      updatedContent = contentService.updateContent(parseInt(idToUpdate, 10), updateData);
      expect(updatedContent).toEqual(updateData);
      
      
    });
  });

  test('Update non-existing content', ({ given, when, then }) => {
    given(/^que não existe conteúdo com o ID "(.*)"$/, async (idToUpdate) => {
      // Implement logic to ensure no content with the provided ID exists in the mock or database
      const id = parseInt(idToUpdate, 10);
      const mockContent = await prismaMock.content.findUnique({ where: { id: id } });
      expect(mockContent).toEqual(null);
    });

    when(/^eu tentar atualizar o conteúdo com o ID "(.*)" com os seguintes dados: title: "(.*)", duration: "(.*)", genre: "(.*)", director: "(.*)"$/, async (idToUpdate, new_title, new_duration, new_genre, new_director) => {
      updateData = {
        title: new_title,
        duration: parseInt(new_duration, 10),
        genre: new_genre,
        director: new_director}; // Assuming your step passes a table with update data
      try {
        updatedContent = await contentService.updateContent(parseInt(idToUpdate, 10), updateData);
      } catch (e) {
        exceptionThrown = e;
      }
    });

    then(/^deve ser lançada uma mensagem "([^"]*)"$/, (expectedMessage) => {
      expect(exceptionThrown.message).toBe(expectedMessage);
    });
  });
});
