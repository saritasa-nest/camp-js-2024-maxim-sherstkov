import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registration';

export namespace RegistrationMapper {

	/**
	 * Maps model to DTO.
	 * @param model Registration model.
	 */
	export function toDto(model: Registration): RegistrationDto {
		return {
			email: model.email,
			password: model.password,
			first_name: model.firstName,
			last_name: model.lastName,
		};
	}
}