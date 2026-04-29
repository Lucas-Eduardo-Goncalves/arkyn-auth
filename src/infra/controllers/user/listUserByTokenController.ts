import { ListUserByTokenUseCase } from "../../../app/useCases/user/listUserByTokenUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";

class ListUserByTokenController {
  constructor(private listUserByTokenUseCase: ListUserByTokenUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const user = await this.listUserByTokenUseCase.execute(userId);
      return route.response.json(user, 200);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListUserByTokenController };
