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

  get isProductionEnv(): boolean {
    const env = this.get('APP_ENV') || process.env.APP_ENV;
    return env === 'production';
  }

  get getDatabaseVersion() {
    return this.get('POSTGRES_VERSION');
  }

  get getDatabaseName() {
    return this.get('POSTGRES_DATABASE_NAME');
  }

  get getDatabaseUser() {
    return this.get('POSTGRES_USER');
  }

  get getDatabasePassword() {
    return this.get('POSTGRES_PASSWORD');
  }

  get getDatabaseUrl() {
    return this.get('POSTGRES_URL');
  }

  get getAppEnv() {
    return this.get('APP_ENV') || 'development';
  }

  get getAppDomain() {
    return this.get('APP_DOMAIN') || 'localhost';
  }

  get getAppPort() {
    return this.get('APP_PORT');
  }

  get getTtl() {
    return this.get('TIME_TO_LIVE');
  }

  get getRequestsLimit() {
    return this.get('REQUESTS_LIMIT');
  }

  get getJwtAccessSecret() {
    return this.get(`JWT_ACCESS_SECRET`);
  }

  get getJwtRefreshSecret() {
    return this.get(`JWT_REFRESH_SECRET`);
  }

  get getAccessTokenExpiresIn() {
    return this.get('ACCESS_TOKEN_EXPIRES_IN');
  }

  get getRefreshTokenExpiresIn() {
    return this.get('REFRESH_TOKEN_EXPIRES_IN');
  }
}
