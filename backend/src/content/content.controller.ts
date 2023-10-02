import { Controller, Delete, Param, Patch, Body, UseGuards, Get, Post, ParseIntPipe } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentDto, CreateContentDto } from './dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
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
    async removeContent(@GetUser('id') userId: number, @Param('id', ParseIntPipe) contentId: number) {
        return this.contentService.removeContent(userId, contentId);
    }

    @Patch(':id')
    async updateContent(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) contentId: number,
        @Body() dto: UpdateContentDto,
    ) {
        return this.contentService.updateContent(userId, contentId, dto);
    }
}


