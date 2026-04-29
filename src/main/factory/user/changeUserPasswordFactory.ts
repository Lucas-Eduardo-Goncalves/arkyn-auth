import { PrismaUserRepository } from "../../../infra/repositories/user";
import { ChangeUserPasswordUseCase } from "../../../app/useCases/user/changeUserPasswordUseCase";
import { ChangeUserPasswordController } from "../../../infra/controllers/user/changeUserPasswordController";

const prismaUserRepository = new PrismaUserRepository();
const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(
  prismaUserRepository,
);
const changeUserPasswordController = new ChangeUserPasswordController(
  changeUserPasswordUseCase,
);

const changeUserPassword = {
  handle: changeUserPasswordController.handle.bind(
    changeUserPasswordController,
  ),
};

export { changeUserPassword };
