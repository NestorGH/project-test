import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [DatabaseModule, EmployeeModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
