import { GiftServerGiftEntity } from '@gift-store/core/shared/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, iif, mapTo, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';

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
				switchMap((entity: GiftServerGiftEntity | null) => {
					return iif(
						() => !entity,
						throwError(() => new Error(`Cannot find gift by id: ${id}`)),
						of(entity)
					);
				})
			);
	}

	findByUserId$(userId: number): Observable<Array<GiftServerGiftEntity>> {
		return from(
			this.repository.findBy({ user: { id: userId } })
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

	update$(entity: GiftServerGiftEntity): Observable<GiftServerGiftEntity> {
		return from(this.repository.update({ id: entity.id }, entity))
			.pipe(
				mapTo(entity)
			);
	}
}