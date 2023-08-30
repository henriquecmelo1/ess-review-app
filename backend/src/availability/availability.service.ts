import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailabilityByContentId(contentId: string): Promise<void> {
    return this.prisma.availability.findMany({
      where: { contentId },
    });
  }
}