import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContentDto } from './dto/update-content.dto';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [ContentService, PrismaService],
    }).compile();

    contentController = module.get<ContentController>(ContentController);
    contentService = module.get<ContentService>(ContentService);
  });

  describe('updateContent', () => {
    it('should update content by ID', async () => {
      const mockContentId = 1;
      const mockUpdateData: UpdateContentDto = {
        title: 'Updated Title',
      };
      const mockUpdatedContent = { id: 1, title: 'Updated Title', duration: 120, genre: 'Old Genre', director: 'Old Director' };

      jest.spyOn(contentService, 'updateContent').mockResolvedValue(mockUpdatedContent);

      const updatedContent = await contentController.updateContent(mockContentId, mockUpdateData);

      expect(updatedContent).toEqual(mockUpdatedContent);
      expect(contentService.updateContent).toHaveBeenCalledWith(mockContentId, mockUpdateData);
    });
  });
});
