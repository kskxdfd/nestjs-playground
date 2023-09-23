import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/rorles.guard';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UserRepository,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
