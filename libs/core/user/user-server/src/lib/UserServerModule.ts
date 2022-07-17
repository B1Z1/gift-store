import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './UserServerController';
import { UserServerService } from './UserServerService';
import { UserServerUser } from './UserServerUser';

@Module({
  imports: [TypeOrmModule.forFeature([UserServerUser])],
  controllers: [UserServerController],
  providers: [UserServerService],
})
export class UserServerModule {
}
