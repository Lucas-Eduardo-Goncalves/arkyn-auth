import { PrismaUserRepository } from "../../../infra/repositories/user";
import { ListUserByEmailUseCase } from "../../../app/useCases/user/listUserByEmailUseCase";
import { ListUserByEmailController } from "../../../infra/controllers/user/listUserByEmailController";

const prismaUserRepository = new PrismaUserRepository();
const listUserByEmailUseCase = new ListUserByEmailUseCase(prismaUserRepository);
const listUserByEmailController = new ListUserByEmailController(
  listUserByEmailUseCase,
);

const listUserByEmail = {
  handle: listUserByEmailController.handle.bind(listUserByEmailController),
};

export { listUserByEmail };
