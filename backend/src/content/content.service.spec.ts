import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContentDto } from './dto/update-content.dto';

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

    describe('updateContent', () => {
      it('should update content by ID', async () => {
        const mockContentId = 1;
        const mockUpdateData: UpdateContentDto = {
          title: 'Updated Title',
        };
        const mockExistingContent = { id: 1, title: 'Old Title', duration: 120, genre: 'Old Genre', director: 'Old Director' };
  
        jest.spyOn(prismaService.content, 'findUnique').mockResolvedValue(mockExistingContent);
        jest.spyOn(prismaService.content, 'update').mockResolvedValue({ ...mockExistingContent, ...mockUpdateData });
  
        const updatedContent = await contentService.updateContent(mockContentId, mockUpdateData);
  
        expect(updatedContent.title).toBe('Updated Title');
        expect(prismaService.content.update).toHaveBeenCalledWith({
          where: { id: mockContentId },
          data: mockUpdateData,
        });
      });
  
      it('should throw NotFoundException when content does not exist', async () => {
        const mockContentId = 999; // Assume-se que este ID não existe
        const mockUpdateData: UpdateContentDto = {
          title: 'Updated Title',
        };
  
        jest.spyOn(prismaService.content, 'findUnique').mockResolvedValue(null);
  
        try {
          await contentService.updateContent(mockContentId, mockUpdateData);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
