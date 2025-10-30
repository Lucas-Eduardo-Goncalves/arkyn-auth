import { ValidateUserIdUseCase } from "../../../app/useCases/user/validateUserIdUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";

class ValidateUserIdController {
  constructor(private validateUserIdUseCase: ValidateUserIdUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      await this.validateUserIdUseCase.execute({ userId });
      return route.response.json({ userId }, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ValidateUserIdController };
