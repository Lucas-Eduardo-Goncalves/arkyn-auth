import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { UserRepository } from "../../../domain/repositories/user";

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw HttpAdapter.notFound("User not found");

    if (user.id !== userId)
      throw HttpAdapter.unauthorized("You do not own this user");

    await this.userRepository.deleteUser(user.id);
  }
}

export { DeleteUserUseCase };
