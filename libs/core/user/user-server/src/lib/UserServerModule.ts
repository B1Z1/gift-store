import { UserServerUserEntity } from '@gift-store/core/shared/entities';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './UserServerController';
import { UserServerService } from './UserServerService';

@Module({
	imports: [TypeOrmModule.forFeature([UserServerUserEntity])]
})
export class UserServerModule {
	static forRoot(): DynamicModule {
		return {
			module: UserServerModule,
			controllers: [UserServerController],
			providers: [UserServerService]
		};
	}
}
