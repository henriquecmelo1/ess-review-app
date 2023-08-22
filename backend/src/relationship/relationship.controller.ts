import { Controller, Post, Delete, Param } from "@nestjs/common"
import { RelationshipService } from './relationship.service';

@Controller('follow')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post(':followerId/:followingId')
  async followUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    await this.relationshipService.followUser(followerId, followingId);
  }

  @Delete(':followerId/:followingId')
  async unfollowUser(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ): Promise<void> {
    await this.relationshipService.followUser(followerId, followingId);
  }
}