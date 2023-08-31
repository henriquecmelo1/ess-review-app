import {Module} from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RelationshipController } from './relationship.controller';
import { RelationshipService } from './relationship.service';
@Module({
    imports: [UserModule],
    controllers: [RelationshipController],
    providers: [RelationshipService],
})

export class RelationshipModule {}