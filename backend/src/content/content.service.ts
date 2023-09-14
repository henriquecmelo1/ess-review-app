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

    async removeContent(userId: number, contentId: number) {
      const Content = await this.prisma.content.findUnique({ where: { id: contentId } });
  
      if (!Content) {
        throw new NotFoundException(`Content with ID ${contentId} not found`);
      }
  
      await this.prisma.content.delete({ where: { id:contentId } });
      return { message: `Content with ID ${contentId} has been removed` };
    }

    async updateContent(userId: number, contentId: number, dto: UpdateContentDto) {
        const existingContent = await this.prisma.content.findUnique({ where: { id: contentId } });
      
        if (!existingContent) {
          throw new NotFoundException(`Content with ID ${contentId} not found`);
        }
      
        const updatedContent = await this.prisma.content.update({
          where: { id: contentId },
          data: {...dto},
        });
      
        return updatedContent;
      }
      
}