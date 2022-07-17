import { GiftServerGiftEntity } from '@gift-store/core/shared/entities';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftServerDTOConverter } from './converters/GiftServerDTOConverter';
import { GiftServerEntityConverter } from './converters/GiftServerEntityConverter';
import { GiftServerController } from './GiftServerController';
import { GiftServerService } from './GiftServerService';

@Module({
	imports: [TypeOrmModule.forFeature([GiftServerGiftEntity])]
})
export class GiftServerModule {
	static forRoot(): DynamicModule {
		return {
			module: GiftServerModule,
			providers: [GiftServerService, GiftServerDTOConverter, GiftServerEntityConverter],
			controllers: [GiftServerController]
		};
	}
}
