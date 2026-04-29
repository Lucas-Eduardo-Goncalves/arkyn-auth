import { UserRepository } from "../../../domain/repositories/user";

class ListUserByTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;

    return user.toJson();
  }
}

export { ListUserByTokenUseCase };
