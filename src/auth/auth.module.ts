import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: process.env.API_KEY,
    signOptions: { expiresIn: '5m' }, // Adjust the expiration time as needed (1day, 1h, etc.)
  }),],
  exports: [AuthService]
})
export class AuthModule { }
