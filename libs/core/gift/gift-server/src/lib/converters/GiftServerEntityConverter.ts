import { CreateGiftDTO, UpdateGiftDTO } from '@gift-store/core/gift/gift-api';
import { Injectable } from '@nestjs/common';
import { GiftServerGiftEntity } from '../GiftServerGiftEntity';

@Injectable()
export class GiftServerEntityConverter {
	fromCreateDTO(dto: CreateGiftDTO): GiftServerGiftEntity {
		const entity = new GiftServerGiftEntity();

		entity.name = dto.name;
		entity.imageUrl = dto.imageUrl;
		entity.link = dto.link;

		return entity;
	}

	fromUpdateDTO(dto: UpdateGiftDTO): GiftServerGiftEntity {
		const entity = new GiftServerGiftEntity();

		entity.id = dto.id;
		entity.name = dto.name;
		entity.imageUrl = dto.imageUrl;
		entity.link = dto.link;

		return entity;
	}
}