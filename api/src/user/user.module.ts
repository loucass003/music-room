import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'
import { UserResolver } from './user.resolver'

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity])
  ],
  providers: [UserResolver],
})
export class UserModule {}
