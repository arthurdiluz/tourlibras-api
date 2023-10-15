import { Module } from '@nestjs/common';
import { S3Service } from './services/aws.service';

@Module({
  imports: [],
  controllers: [],
  providers: [S3Service],
  exports: [S3Service],
})
export class AwsModule {}
