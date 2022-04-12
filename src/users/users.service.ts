import { UserRegisterDto } from '../dto/user-register.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { IUserService } from './userrs.service.interface';
import { User } from './user.entity';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ConfigService } from '../config/config.service';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: ConfigService) {}

	async createUser({ email, password, name }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		console.log(salt);
		await newUser.setPassword(password, Number(salt));
		//проверим что он есть. если нет то создаем то вернем User
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
