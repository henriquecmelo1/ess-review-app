import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { PrismaService } from '../prisma/prisma.service'; // Importe o serviço do Prisma

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, PrismaService],
})
export class AvailabilityModule {}

