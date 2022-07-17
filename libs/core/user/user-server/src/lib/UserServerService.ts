import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, iif, mapTo, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { UserServerUser } from './UserServerUser';

@Injectable()
export class UserServerService {
	constructor(
		@InjectRepository(UserServerUser) private readonly repository: Repository<UserServerUser>
	) {
	}

	login$(user: UserServerUser): Observable<UserServerUser | null> {
		return from(
			this.repository.findOne({
				where: {
					username: user.username,
					password: user.password
				}
			})
		)
			.pipe(
				switchMap((result: UserServerUser | null) => {
					return iif(
						() => !result,
						throwError(() => new Error('Cannot find user')),
						of(result)
					);
				})
			);
	}

	register$(user: UserServerUser): Observable<UserServerUser> {
		return from(this.repository.insert(user))
			.pipe(
				mapTo(user)
			);
	}
}
