import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn() id: number;
    
    @Column({
		nullable: true
	})
	name: string;
    
    @Column({
		nullable: true
	})
	email: string;
    
    @Column({
		unique: true
	})
	username: string;
    
    @Column() password: string;
}
