import { JwtTokenDto } from '../dtos/jwt-token.dto';
import { JwtToken } from '../models/jwt-token';

export namespace JwtTokenMapper {

	/**
	 * Maps dto to model.
	 * @param dto Jwt dto.
	 */
	export function fromDto(dto: JwtTokenDto): JwtToken {
		return new JwtToken({
			refresh: dto.refresh,
			access: dto.access,
		});
	}
}
