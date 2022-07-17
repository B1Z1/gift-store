import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GiftServerGiftEntity } from './GiftServerGiftEntity';

@Entity({ name: 'User' })
export class UserServerUserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany(() => GiftServerGiftEntity, gift => gift.user)
	gifts: GiftServerGiftEntity[];
}
