import { GiftDTO } from '@gift-store/core/gift/gift-api';
import { GiftServerGiftEntity } from '@gift-store/core/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GiftServerDTOConverter {
	fromEntities(entities: Array<GiftServerGiftEntity>): Array<GiftDTO> {
		return entities.map(entity => this.fromEntity(entity));
	}

	fromEntity(entity: GiftServerGiftEntity): GiftDTO {
		return {
			id: entity.id,
			name: entity.name,
			imageUrl: entity.imageUrl,
			link: entity.link
		};
	}
}