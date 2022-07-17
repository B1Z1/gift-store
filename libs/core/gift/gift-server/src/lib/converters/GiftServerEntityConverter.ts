import { CreateGiftDTO, UpdateGiftDTO } from '@gift-store/core/gift/gift-api';
import { GiftServerGiftEntity, UserServerUserEntity } from '@gift-store/core/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GiftServerEntityConverter {
	fromCreateDTO(dto: CreateGiftDTO): GiftServerGiftEntity {
		const entity = new GiftServerGiftEntity();
		const userEntity = new UserServerUserEntity();

		userEntity.id = dto.userId;

		entity.name = dto.name;
		entity.imageUrl = dto.imageUrl;
		entity.link = dto.link;
		entity.user = userEntity;

		return entity;
	}

	fromUpdateDTO(id: number, dto: UpdateGiftDTO): GiftServerGiftEntity {
		const entity = new GiftServerGiftEntity();

		entity.id = id;
		entity.name = dto.name;
		entity.imageUrl = dto.imageUrl;
		entity.link = dto.link;

		return entity;
	}
}