// availability.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from './availability.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AvailabilityService', () => {
  let availabilityService: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilityService, PrismaService],
    }).compile();

    availabilityService = module.get<AvailabilityService>(AvailabilityService);
  });

  describe('getAvailabilityByContentId', () => {
    it('should return availability for a contentId', async () => {
      const mockAvailability = {id: 1, title: 'Titanic', contentID: 2, plataform: 'Star+', link: 'https://www.starplus.com/pt-br/movies/titanic/1vXLGiOUqEP9', content: 3};
      jest.spyOn(availabilityService['prisma'].availability, 'findMany').mockResolvedValue(mockAvailability);
      const result = await availabilityService.getAvailabilityByContentId('yourMockContentId');

      expect(result).toEqual(mockAvailability);
    });
  });
});
