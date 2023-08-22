import { Controller, Delete, Param, Patch, Body } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

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


