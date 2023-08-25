import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigLibModule } from 'src/config/config.module';
import { UserModule } from '../user/user.module';
import { LocalAuthController } from './controllers/local.controller';
import { LocalAuthService } from './services/local.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigLibModule,
    forwardRef(() => UserModule),
  ],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, JwtStrategy],
  exports: [LocalAuthService, JwtStrategy],
})
export class AuthModule {}
