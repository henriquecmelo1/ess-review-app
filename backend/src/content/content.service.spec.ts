import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ContentService', () => {
  let contentService: ContentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService, PrismaService],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(contentService).toBeDefined();
  });

  describe('removeContent', () => {
    it('should remove content by ID', async () => {
      const mockContentId = 1;
      const deleteSpy = jest.spyOn(prismaService.content, 'delete');

      await contentService.removeContent(mockContentId);

      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: mockContentId } });
    });

    it('should throw NotFoundException when content does not exist', async () => {
      const mockContentId = 999; // Assume-se que este ID não existe
      jest.spyOn(prismaService.content, 'findUnique').mockResolvedValue(null);

      try {
        await contentService.removeContent(mockContentId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
