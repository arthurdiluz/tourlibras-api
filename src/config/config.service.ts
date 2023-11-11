import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  protected get(key: string): string {
    return this.envConfig[key];
  }

  get getAppEnv() {
    return this.get('APP_ENV');
  }

  get getAppDomain() {
    return this.get('APP_DOMAIN');
  }

  get getAppPort() {
    return this.get('APP_PORT');
  }

  get getJwtAccessSecret() {
    return this.get('JWT_ACCESS_SECRET');
  }

  get getAccessTokenExpiresIn() {
    return this.get('ACCESS_TOKEN_EXPIRES_IN');
  }

  get getTimeToLive() {
    return this.get('TIME_TO_LIVE');
  }

  get getRequestsLimit() {
    return this.get('REQUESTS_LIMIT');
  }

  get getPostgresUser() {
    return this.get('POSTGRES_USER');
  }

  get getPostgresPassword() {
    return this.get('POSTGRES_PASSWORD');
  }

  get getPostgresHost() {
    return this.get('POSTGRES_HOST');
  }

  get getPostgresPort() {
    return this.get('POSTGRES_PORT');
  }

  get getPostgresDb() {
    return this.get('POSTGRES_DB');
  }

  get getPostgresUrl() {
    return this.get('POSTGRES_URL');
  }

  get getAwsAccessKeyId() {
    return this.get('AWS_ACCESS_KEY_ID');
  }

  get getAwsSecretAccessKey() {
    return this.get('AWS_SECRET_ACCESS_KEY');
  }

  get getAwsRegion() {
    return this.get('AWS_REGION');
  }

  get getAwsS3BucketName() {
    return this.get('AWS_S3_BUCKET_NAME');
  }
}
