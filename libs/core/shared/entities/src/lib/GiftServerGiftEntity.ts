import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserServerUserEntity } from './UserServerUserEntity';

@Entity('Gift')
export class GiftServerGiftEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	imageUrl: string;

	@Column({ nullable: true })
	link: string;

	@ManyToOne(() => UserServerUserEntity, user => user.gifts)
	user: UserServerUserEntity;
}