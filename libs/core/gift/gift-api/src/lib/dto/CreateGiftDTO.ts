export interface CreateGiftDTO {
	readonly userId: number;
	readonly name: string;
	readonly imageUrl: string;
	readonly link?: string;
}