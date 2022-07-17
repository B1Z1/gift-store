import { LoginUserDTO, RegisterUserDTO, UserDTO } from '@gift-store/core/user/user-api';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { UserServerService } from './UserServerService';
import { UserServerUserEntity } from './UserServerUserEntity';

@Controller('user')
export class UserServerController {
	constructor(
		private readonly service: UserServerService
	) {
	}

	@Post('login')
	login(@Body() dto: LoginUserDTO): Observable<UserDTO> {
		const user: UserServerUserEntity = new UserServerUserEntity();

		user.username = dto.username;
		user.password = dto.password;

		return this.service.login$(user)
			.pipe(
				map((user: UserServerUserEntity) => {
					return {
						id: user.id,
						username: user.username
					};
				}),
				catchError(() => {
					throw new HttpException('Cannot login user', HttpStatus.FORBIDDEN);
				})
			);
	}

	@Post('register')
	register(@Body() dto: RegisterUserDTO): Observable<UserDTO> {
		const user: UserServerUserEntity = new UserServerUserEntity();

		user.username = dto.username;
		user.password = dto.password;

		return this.service.register$(user)
			.pipe(
				map((user: UserServerUserEntity) => {
					return {
						id: user.id,
						username: user.username
					};
				}),
				catchError(() => {
					throw new HttpException('Cannot register user', HttpStatus.FORBIDDEN);
				})
			);
	}
}
