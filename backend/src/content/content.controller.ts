import { Controller, Delete, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) {}

    @Delete(':id')
  async removeContent(@Param('id') id: number) {
    return this.contentService.removeContent(id);
  }
}

