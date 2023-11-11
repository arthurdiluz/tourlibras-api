import { DeleteObjectOutput, S3, _Object } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import formatPath from 'src/common/helpers/formatPath';

@Injectable()
export class S3Service {
  private readonly s3 = new S3({
    region: this.configService.getAwsRegion,
    credentials: {
      accessKeyId: this.configService.getAwsAccessKeyId,
      secretAccessKey: this.configService.getAwsSecretAccessKey,
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File, directory?: string): Promise<string> {
    const Key = formatPath({ directory, fileName: file?.originalname });
    const result = await this.s3.putObject({
      Bucket: this.configService?.getAwsS3BucketName,
      Key: Key,
      Body: file.buffer,
    });

    if (!result) {
      throw new InternalServerErrorException(`Could not upload to AWS`);
    }

    return Key;
  }

  async findAll(directory: string): Promise<_Object[]> {
    const { Contents } = await this.s3.listObjects({
      Bucket: this.configService?.getAwsS3BucketName,
      Prefix: formatPath({ directory }),
    });

    return Contents;
  }

  async findByKey(Key: string): Promise<_Object> {
    return await this.s3.getObject({
      Bucket: this.configService?.getAwsS3BucketName,
      Key,
    });
  }

  async delete(Key: string): Promise<DeleteObjectOutput> {
    return await this.s3.deleteObject({
      Bucket: this.configService.getAwsS3BucketName,
      Key: formatPath({ directory: Key }),
    });
  }
}
