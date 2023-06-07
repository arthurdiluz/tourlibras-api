import { Module } from '@nestjs/common';
import { LocalAuthController } from './controllers/local.controller';
import { LocalAuthService } from './services/local.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from './strategies';
import { ConfigLibModule } from 'src/config/config.module';

@Module({
  imports: [JwtModule.register({}), ConfigLibModule, UserModule],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, AccessTokenStrategy],
  exports: [LocalAuthService, AccessTokenStrategy],
})
export class AuthModule {}
