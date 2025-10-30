import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { UserRepository } from "../../../domain/repositories/user";

type InputProps = {
  userId: string;
};

class ValidateUserIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { userId } = input;

    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }
  }
}

export { ValidateUserIdUseCase };
