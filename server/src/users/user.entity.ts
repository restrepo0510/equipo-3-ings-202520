import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Represents a user entity in the system.
 * Contains user profile information and authentication data.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Full name of the user'
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
    comment: 'Unique email address for authentication and communication'
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Contact phone number'
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Hashed password for user authentication'
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Timestamp when the user was created'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Timestamp when the user was last updated'
  })
  updatedAt: Date;
}

/**Data transfer object for creating a new user*/
export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/**Data transfer object for updating user information*/
export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}