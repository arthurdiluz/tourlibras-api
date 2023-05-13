import { Module } from '@nestjs/common';
import { LocalAuthController } from './controllers/local.controller';
import { LocalAuthService } from './services/local-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { ConfigLibModule } from 'src/config/config.module';
import { LocalAuthRepository } from './repositories/local-auth.repository';

@Module({
  imports: [JwtModule.register({}), ConfigLibModule, UserModule],
  controllers: [LocalAuthController],
  providers: [
    LocalAuthService,
    LocalAuthRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    LocalAuthService,
    LocalAuthRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
