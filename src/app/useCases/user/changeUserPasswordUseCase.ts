import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { UserRepository } from "../../../domain/repositories/user";
import { PasswordAdapter } from "../../../infra/adapters/passwordAdapter";

type InputProps = {
  currentPassword: string;
  newPassword: string;
  userId: string;
};

class ChangeUserPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { currentPassword, newPassword, userId } = input;

    const user = await this.userRepository.findById(userId);
    if (!user) throw HttpAdapter.notFound("User not found");

    if (user.id !== userId) {
      throw HttpAdapter.unauthorized("You do not own this user");
    }

    const hashedPassword = await PasswordAdapter.hash(newPassword);

    if (!(await PasswordAdapter.safeVerify(user.password, currentPassword))) {
      throw HttpAdapter.badRequest("Invalid current password");
    }

    user.updatePassword(hashedPassword);
    await this.userRepository.updateUser(user);

    return user.toJson();
  }
}

export { ChangeUserPasswordUseCase };
