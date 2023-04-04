import * as dotenv from 'dotenv';

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

  get appEnv() {
    return this.get('APP_ENV') || 'development';
  }

  get isProductionEnv(): boolean {
    const env = this.get('APP_ENV') || process.env.APP_ENV;
    return env === 'production';
  }

  get getAppPort() {
    return this.get('APP_PORT');
  }

  get getAppDomain() {
    return this.get('APP_DOMAIN') || 'localhost';
  }

  get getDatabaseVersion() {
    return this.get('DATABASE_VERSION');
  }

  get getDatabaseName() {
    return this.get('DATABASE_NAME');
  }

  get getDatabaseUser() {
    return this.get('DATABASE_USER');
  }

  get getDatabasePassword() {
    return this.get('DATABASE_PASSWORD');
  }

  get getDatabaseUrl() {
    return this.get('DATABASE_URL');
  }
}
