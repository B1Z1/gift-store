import { CreateGiftDTO, GiftDTO, UpdateGiftDTO } from '@gift-store/core/gift/gift-api';
import { GiftServerGiftEntity } from '@gift-store/core/shared/entities';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { GiftServerDTOConverter } from './converters/GiftServerDTOConverter';
import { GiftServerEntityConverter } from './converters/GiftServerEntityConverter';
import { GiftServerService } from './GiftServerService';

@Controller('gift')
export class GiftServerController {
	constructor(
		private readonly service: GiftServerService,
		private readonly dtoConverter: GiftServerDTOConverter,
		private readonly entityConverter: GiftServerEntityConverter,
	) {
	}

	@Get()
	findAll(): Observable<Array<GiftDTO>> {
		return this.service.findAll$()
			.pipe(
				map(entities => this.dtoConverter.fromEntities(entities))
			);
	}

	@Get(':id')
	findById(@Param() { id }: { id: number }): Observable<GiftDTO> {
		return this.service.findById$(id)
			.pipe(
				map(entity => this.dtoConverter.fromEntity(entity)),
				catchError(() => {
					throw new HttpException(`Cannot find gift by id: ${id}`, HttpStatus.FORBIDDEN);
				})
			);
	}

	@Get('user/:userId')
	findByUserId(@Param() { userId }: { userId: number }): Observable<Array<GiftDTO>> {
		return this.service.findByUserId$(userId)
			.pipe(
				map(entities => this.dtoConverter.fromEntities(entities))
			);
	}

	@Post()
	create(@Body() dto: CreateGiftDTO): Observable<GiftDTO> {
		const requestEntity: GiftServerGiftEntity = this.entityConverter.fromCreateDTO(dto);

		return this.service.add$(requestEntity)
			.pipe(
				map(entity => this.dtoConverter.fromEntity(entity))
			);
	}

	@Post(':id')
	update(
		@Param() { id }: { id: number },
		@Body() dto: UpdateGiftDTO
	): Observable<GiftDTO> {
		const requestEntity: GiftServerGiftEntity = this.entityConverter.fromUpdateDTO(id, dto);

		return this.service.update$(requestEntity)
			.pipe(
				map(entity => this.dtoConverter.fromEntity(entity))
			);
	}

	@Delete(':id')
	remove(@Param() { id }: { id: number }): Observable<void> {
		return this.service.remove$(id);
	}
}