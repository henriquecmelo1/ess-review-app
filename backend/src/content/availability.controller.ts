import { Controller, Get, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get(':contentId')
  async getAvailability(@Param('contentId') contentId: string) {
    return this.availabilityService.getAvailabilityByContentId(contentId);
  }
}



