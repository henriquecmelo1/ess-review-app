import { Controller, Get, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private movieAvailabilityService: AvailabilityService) {}

  @Get()
  async getMovieAvailability(@Param('title') title: string) {
    const availability = await this.movieAvailabilityService.getMovieAvailabilityByTitle(title);
    return { availability };
  }
}
