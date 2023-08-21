import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentService {
    constructor(private readonly prisma: PrismaService) {}

    async removeContent(id: number) {
      const content = await this.prisma.content.findUnique({ where: { id } });
  
      if (!content) {
        throw new NotFoundException(`Content with ID ${id} not found`);
      }
  
      await this.prisma.content.delete({ where: { id } });
      return { message: `Content with ID ${id} has been removed` };
    }
}