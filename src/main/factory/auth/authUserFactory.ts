import { AuthUserUseCase } from "../../../app/useCases/auth/authUserUseCase";
import { AuthUserController } from "../../../infra/controllers/auth/authUserController";
import { PrismaUserRepository } from "../../../infra/repositories/user";

const prismaUserRepository = new PrismaUserRepository();
const authUserUseCase = new AuthUserUseCase(prismaUserRepository);
const authUserController = new AuthUserController(authUserUseCase);

const authUser = {
  handle: authUserController.handle.bind(authUserController),
};

export { authUser };
