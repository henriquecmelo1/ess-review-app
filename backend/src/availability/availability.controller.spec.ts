import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AvailabilityController', () => {
  let availabilityController: AvailabilityController;
  let availabilityService: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [AvailabilityService, PrismaService],
    }).compile();

    availabilityController = module.get<AvailabilityController>(AvailabilityController);
    availabilityService = module.get<AvailabilityService>(AvailabilityService);
  });

  describe('getAvailability', () => {
    it('should return availability for a contentId', async () => {
        const mockAvailability = {id: 1, title: 'Titanic', contentID: 2, plataform: 'Star+', link: 'https://www.starplus.com/pt-br/movies/titanic/1vXLGiOUqEP9', content: 3};
        jest.spyOn(availabilityService, 'getAvailabilityByContentId').mockResolvedValue(mockAvailability);
      const result = await availabilityController.getAvailability('2');

      expect(result).toEqual(mockAvailability);
    });
  });
});
