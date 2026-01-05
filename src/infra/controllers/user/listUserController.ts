import { ListUserUseCase } from "../../../app/useCases/user/listUserUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";

class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const user = await this.listUserUseCase.execute(userId);
      return route.response.json(user, 200);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListUserController };
