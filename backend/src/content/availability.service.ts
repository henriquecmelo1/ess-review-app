import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Importe o serviço do Prisma


@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailabilityByContentId(contentId: string): Promise<void> {
    return this.prisma.availability.findMany({
      where: { contentId },
    });
  }
}