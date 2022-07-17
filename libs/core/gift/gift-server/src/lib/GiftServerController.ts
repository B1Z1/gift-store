import { CreateGiftDTO, GiftDTO, UpdateGiftDTO } from '@gift-store/core/gift/gift-api';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { GiftServerDTOConverter } from './converters/GiftServerDTOConverter';
import { GiftServerEntityConverter } from './converters/GiftServerEntityConverter';
import { GiftServerGiftEntity } from './GiftServerGiftEntity';
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

	@Post('create')
	create(@Body() dto: CreateGiftDTO): Observable<GiftDTO> {
		const requestEntity: GiftServerGiftEntity = this.entityConverter.fromCreateDTO(dto);

		return this.service.add$(requestEntity)
			.pipe(
				map(entity => this.dtoConverter.fromEntity(entity))
			);
	}

	@Post('update')
	update(@Body() dto: UpdateGiftDTO): Observable<GiftDTO> {
		const requestEntity: GiftServerGiftEntity = this.entityConverter.fromUpdateDTO(dto);

		return this.service.update$(requestEntity)
			.pipe(
				map(entity => this.dtoConverter.fromEntity(entity))
			);
	}

	@Post('remove/:id')
	remove(@Param() { id }: { id: number }): Observable<void> {
		return this.service.remove$(id);
	}
}