import { MikroOrmModuleOptions } from '@mikro-orm/nestjs'
import { GqlModuleOptions as OGqlModuleOptions } from '@nestjs/graphql'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

// fix wrong typing
type GqlModuleOptions = OGqlModuleOptions & { playground: boolean }

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (typeof value !== 'string' && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return value!
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true))
    return this
  }

  public getPort() {
    return parseInt(this.getValue('PORT', false)) || 3000
  }

  public getListenHost() {
    return this.getValue('LISTEN_HOST', false) || '127.0.0.1'
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode === 'PRODUCTION'
  }

  public getMikroOrmConfig(): MikroOrmModuleOptions {
    return {
      entities: [path.join(__dirname, '../entities')],
      entitiesTs: [path.join(__dirname, '../entities')],
      type: 'postgresql',
      baseDir: path.join(__dirname, '../..'),
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      user: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      dbName: this.getValue('POSTGRES_DATABASE'),
      migrations: {
        path: path.join(__dirname, '../migrations'),
      },
    }
  }

  public getGraphQLConfig(): GqlModuleOptions {
    return this.isProduction()
      ? {
          debug: false,
          playground: false,
          autoSchemaFile: path.join(__dirname, '../schema.gql'),
        }
      : {
          debug: true,
          playground: true,
          autoSchemaFile: path.join(__dirname, '../schema.gql'),
        }
  }

  public getGoogleClientKeys(): { id: string; secret: string } {
    return {
      id: this.getValue('GOOGLE_CLIENT_ID'),
      secret: this.getValue('GOOGLE_CLIENT_SECRET'),
    }
  }

  public getGoogleOAuthUrl(): string {
    return this.getValue('GOOGLE_AUTH_LOGIN_URL')
  }

  public getOAuthRedirection(): string {
    return this.getValue('OAUTH_REDIRECTION', false) || '/'
  }

  public getCookieSecret(): string {
    return this.getValue('COOKIE_SECRET')
  }

  public getSendgridApiKey(): string {
    return this.getValue('SENDGRID_API_KEY')
  }

  public getSendgridSender(): string {
    return this.getValue('SENDGRID_SENDER')
  }

  public getAccountActivationUrl(): string {
    return this.getValue('ACCOUNT_ACTIVATION_URL')
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
])

export { configService }
