import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;
	@IsString({ message: 'Вы не указали пароль' })
	password: string;
	@IsString({ message: 'Вы не указали имя' })
	name: string;
}
