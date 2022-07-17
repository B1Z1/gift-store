import { GiftDTO } from '@gift-store/core/gift/gift-api';
import { Injectable } from '@nestjs/common';
import { GiftServerGiftEntity } from '../GiftServerGiftEntity';

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