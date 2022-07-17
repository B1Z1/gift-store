import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, iif, mapTo, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { GiftServerGiftEntity } from './GiftServerGiftEntity';

@Injectable()
export class GiftServerService {
	constructor(
		@InjectRepository(GiftServerGiftEntity) private readonly repository: Repository<GiftServerGiftEntity>
	) {
	}

	findAll$(): Observable<Array<GiftServerGiftEntity>> {
		return from(this.repository.find());
	}

	findById$(id: number): Observable<GiftServerGiftEntity> {
		return from(
			this.repository.findOneBy({ id: id })
		)
			.pipe(
				switchMap((gift: GiftServerGiftEntity | null) => {
					return iif(
						() => !gift,
						throwError(() => new Error(`Cannot find gift by id: ${id}`)),
						of(gift)
					);
				})
			);
	}

	add$(entity: GiftServerGiftEntity): Observable<GiftServerGiftEntity> {
		return from(this.repository.insert(entity))
			.pipe(
				mapTo(entity)
			);
	}

	remove$(id: number): Observable<void> {
		return from(this.repository.delete(id))
			.pipe(
				mapTo(void 0)
			);
	}

	update$(gift: GiftServerGiftEntity): Observable<GiftServerGiftEntity> {
		return from(this.repository.update({ id: gift.id }, gift))
			.pipe(
				mapTo(gift)
			);
	}
}