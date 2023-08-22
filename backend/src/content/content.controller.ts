import { Controller, Delete, Param, Patch, Body, UseGuards, Get, Post, ParseIntPipe } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentDto, CreateContentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
@UseGuards(JwtGuard)
@Controller('contents')
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Post()
    createContent(@GetUser('id') userId:number, @Body() dto:CreateContentDto){
        return this.contentService.createContent(userId, dto)
    }
        
    @Get()
    getContent(@GetUser('id') userId:number){
        return this.contentService.getContent(userId)
    }

    @Get(':id')
    getContentById(@GetUser('id') userId:number, @Param('id', ParseIntPipe) contentId: number){
        return this.contentService.getContentById(userId, contentId)
    }    

    @Delete(':id')
    async removeContent(@Param('id') id: number) {
        return this.contentService.removeContent(id);
    }

    @Patch(':id')
    async updateContent(
        @Param('id') id: number,
        @Body() updateData: UpdateContentDto,
    ) {
        return this.contentService.updateContent(id, updateData);
    }
}


