import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from './user.entity';

export interface UserService {
	createUser: (dto: UserRegisterDto) => User | null;
	validateUser: (dto: UserLoginDto) => boolean;
}
