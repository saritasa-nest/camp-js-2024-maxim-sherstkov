import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

export namespace LoginMapper {

	/**
	 * Maps model to DTO.
	 * @param model Login model.
	 */
	export function toDto(model: Login): LoginDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
