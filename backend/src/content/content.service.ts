import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto';

@Injectable()
export class ContentService {
    constructor(private readonly prisma: PrismaService) {}
   
    async createContent(userId: number, dto:CreateContentDto){
        const content = await this.prisma.content.create({
            data: {
                userId,
                ...dto,
            }
        })
    }

    getContent(userId: number){
        return this.prisma.content.findMany({
            where: {
                userId,
            }
        });
    }

    getContentById(userId:number, contentId: number){
        return this.prisma.content.findFirst({
            where: {
                id: contentId,
                userId,
            }
        });
    }  

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