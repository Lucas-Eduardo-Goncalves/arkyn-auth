import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { JwtAdapter } from "../../../infra/adapters/jwtAdapter";
import { PasswordAdapter } from "../../../infra/adapters/passwordAdapter";
import { UserRepository } from "../../../domain/repositories/user";

type InputProps = {
  email: string;
  password: string;
};

class AuthUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { email, password } = input;

    const existsUser = await this.userRepository.findByEmail(email);
    if (!existsUser) throw HttpAdapter.notFound("User not found");

    await PasswordAdapter.verify(existsUser.password, password);
    const token = await JwtAdapter.sign(existsUser);

    return { ...existsUser.toJson(), token };
  }
}

export { AuthUserUseCase };
