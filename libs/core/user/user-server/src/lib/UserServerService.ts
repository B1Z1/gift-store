import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, iif, mapTo, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { UserServerUserEntity } from './UserServerUserEntity';

@Injectable()
export class UserServerService {
	constructor(
		@InjectRepository(UserServerUserEntity) private readonly repository: Repository<UserServerUserEntity>
	) {
	}

	login$(user: UserServerUserEntity): Observable<UserServerUserEntity | null> {
		return from(
			this.repository.findOne({
				where: {
					username: user.username,
					password: user.password
				}
			})
		)
			.pipe(
				switchMap((result: UserServerUserEntity | null) => {
					return iif(
						() => !result,
						throwError(() => new Error('Cannot find user')),
						of(result)
					);
				})
			);
	}

	register$(user: UserServerUserEntity): Observable<UserServerUserEntity> {
		return from(this.repository.insert(user))
			.pipe(
				mapTo(user)
			);
	}
}
