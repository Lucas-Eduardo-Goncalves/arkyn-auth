import { PrismaUserRepository } from "../../../infra/repositories/user";
import { ListUserByTokenUseCase } from "../../../app/useCases/user/listUserByTokenUseCase";
import { ListUserByTokenController } from "../../../infra/controllers/user/listUserByTokenController";

const prismaUserRepository = new PrismaUserRepository();
const listUserByTokenUseCase = new ListUserByTokenUseCase(prismaUserRepository);
const listUserByTokenController = new ListUserByTokenController(
  listUserByTokenUseCase,
);

const listUserByToken = {
  handle: listUserByTokenController.handle.bind(listUserByTokenController),
};

export { listUserByToken };
