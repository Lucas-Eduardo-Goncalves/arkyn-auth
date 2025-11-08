import { PrismaUserRepository } from "../../../infra/repositories/user";
import { ValidateUserIdUseCase } from "../../../app/useCases/user/validateUserIdUseCase";
import { ValidateUserIdController } from "../../../infra/controllers/user/validateUserIdController";

const prismaUserRepository = new PrismaUserRepository();
const validateUserIdUseCase = new ValidateUserIdUseCase(prismaUserRepository);
const validateUserIdController = new ValidateUserIdController(
  validateUserIdUseCase
);

const validateUserId = {
  handle: validateUserIdController.handle.bind(validateUserIdController),
};

export { validateUserId };
