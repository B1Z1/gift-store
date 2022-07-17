import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}