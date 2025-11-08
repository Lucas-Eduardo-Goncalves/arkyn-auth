import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PasswordAdapter } from "../../../infra/adapters/passwordAdapter";

type InputProps = {
  email: string;
  name: string;
  password: string;
  utc: number;
};

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { email, name, password, utc } = input;

    const existsUser = await this.userRepository.findByEmail(email);
    if (existsUser) throw HttpAdapter.conflict("User already exists");

    const hashedPassword = await PasswordAdapter.hash(password);

    const user = User.create({ email, name, password: hashedPassword, utc });
    await this.userRepository.createUser(user);

    return user.toJson();
  }
}

export { CreateUserUseCase };
