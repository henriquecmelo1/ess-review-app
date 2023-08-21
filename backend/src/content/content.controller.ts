import { Controller } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto';
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) {}
}
