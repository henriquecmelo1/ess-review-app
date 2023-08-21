import { Controller, Delete, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto';
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Delete(':id')
  async removeContent(@Param('id') id: number) {
    return this.contentService.removeContent(id);
  }
}

