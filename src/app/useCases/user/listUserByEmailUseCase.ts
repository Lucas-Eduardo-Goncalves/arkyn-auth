import { UserRepository } from "../../../domain/repositories/user";

class ListUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    return user.toJson();
  }
}

export { ListUserByEmailUseCase };
