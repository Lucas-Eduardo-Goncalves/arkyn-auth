import { PrismaUserRepository } from "../../../infra/repositories/user";
import { ListUserUseCase } from "../../../app/useCases/user/listUserUseCase";
import { ListUserController } from "../../../infra/controllers/user/listUserController";

const prismaUserRepository = new PrismaUserRepository();
const listUserUseCase = new ListUserUseCase(prismaUserRepository);
const listUserController = new ListUserController(listUserUseCase);

const listUser = {
  handle: listUserController.handle.bind(listUserController),
};

export { listUser };
