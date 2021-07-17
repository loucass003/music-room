import { MikroOrmModuleOptions } from '@mikro-orm/nestjs'
import path from 'path'

require('dotenv').config()

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (typeof value !== 'string' && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value!
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true))
    return this
  }

  public getPort() {
    return parseInt(this.getValue('PORT')) || 3000
  }

  public getListenHost() {
    return this.getValue('LISTEN_HOST') || '127.0.0.1'
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode != 'DEV'
  }

  public getMikroOrmConfig(): MikroOrmModuleOptions {
    return {
        entities: ['../dist/entities'],
        entitiesTs: ['../src/entities'],
        type: 'postgresql',
        baseDir: path.join(__dirname, '../..'),
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT')),
        user: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        dbName: this.getValue('POSTGRES_DATABASE'),
      }
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
