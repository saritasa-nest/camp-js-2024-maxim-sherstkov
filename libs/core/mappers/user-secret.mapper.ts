import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';

export namespace UserSecretMapper {

	/**
	 * Maps dto to model.
	 * @param dto User secret dto.
	 */
	export function fromDto(dto: UserSecretDto): UserSecret {
		return new UserSecret({
			refresh: dto.refresh,
			access: dto.access,
		});
	}

	/**
	 * Maps model to dto.
	 * @param model User secret model.
	 */
	export function toDto(model: UserSecret): UserSecretDto {
		return new UserSecret({
			refresh: model.refresh,
			access: model.access,
		});
	}
}
