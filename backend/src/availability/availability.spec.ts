import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from './availability.service';
import { PrismaService } from '../prisma/prisma.service';

const feature = loadFeature('./availability/availability.feature');

defineFeature(feature, (test) => {
  let availabilityService: AvailabilityService;
  let prismaService: PrismaService;
  let movieTitle: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: PrismaService,
          useValue: {
            availability: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    availabilityService = module.get<AvailabilityService>(AvailabilityService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  test('Filme pesquisado disponível em algum streaming', async ({ given, when, then }) => {
    
    given('um filme Django Livre', (title: string) => {
      movieTitle = title;
    });

    when('Eu pesquiso pelo filme', async () => {
      const mockAvailability: { id: number; contentId: number; plataform: string; link: string; }[] = [
        {
          id: 1,
          contentId: 101,
          plataform: "YouTube",
          link: "https://www.youtube.com/watch?v=example"
        },
        {
          id: 2,
          contentId: 102,
          plataform: "Netflix",
          link: "https://netflix.com/example"
        },
      ];

      jest.spyOn(prismaService.availability, 'findMany').mockResolvedValue(mockAvailability);
    });

    then('Recebo onde o filme está disponível', async () => {
      const result = await availabilityService.getMovieAvailabilityByTitle(movieTitle);
      expect(result).toEqual([{ id: 1, content: { title: movieTitle } }]);
      expect(prismaService.availability.findMany).toHaveBeenCalledWith({
        where: {
          content: {
            title: movieTitle,
          },
        },
      });
    });
  });
});
