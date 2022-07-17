import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './UserServerController';
import { UserServerService } from './UserServerService';
import { UserServerUserEntity } from './UserServerUserEntity';

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
