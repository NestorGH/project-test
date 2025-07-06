import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService],
  imports: [DatabaseModule]
})
export class OwnerModule {}
