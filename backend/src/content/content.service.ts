import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
    constructor(private readonly prisma: PrismaService) {}

    async removeContent(id: number) {
      const Content = await this.prisma.content.findUnique({ where: { id } });
  
      if (!Content) {
        throw new NotFoundException(`Content with ID ${id} not found`);
      }
  
      await this.prisma.content.delete({ where: { id } });
      return { message: `Content with ID ${id} has been removed` };
    }

    async updateContent(id: number, updateData: UpdateContentDto) {
        const existingContent = await this.prisma.content.findUnique({ where: { id } });
      
        if (!existingContent) {
          throw new NotFoundException(`Content with ID ${id} not found`);
        }
      
        const updatedContent = await this.prisma.content.update({
          where: { id },
          data: updateData,
        });
      
        return updatedContent;
      }
      
}