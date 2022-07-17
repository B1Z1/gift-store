import { GiftServerModule } from '@gift-store/core/gift/gift-server';
import { GiftServerGiftEntity, UserServerUserEntity } from '@gift-store/core/shared/entities';
import { UserServerModule } from '@gift-store/core/user/user-server';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: environment.dbHost,
			port: 5432,
			username: environment.dbUsername,
			password: environment.dbPassword,
			database: 'gift-store',
			entities: [
				UserServerUserEntity,
				GiftServerGiftEntity
			],
			synchronize: true
		}),
		UserServerModule.forRoot(),
		GiftServerModule.forRoot()
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
