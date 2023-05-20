import { Module } from '@nestjs/common';
import { LocalAuthController } from './controllers/local.controller';
import { LocalAuthService } from './services/local.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from './strategies';
import { ConfigLibModule } from 'src/config/config.module';
import { LocalAuthRepository } from './repositories/local.repository';

@Module({
  imports: [JwtModule.register({}), ConfigLibModule, UserModule],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, LocalAuthRepository, AccessTokenStrategy],
  exports: [LocalAuthService, LocalAuthRepository, AccessTokenStrategy],
})
export class AuthModule {}
