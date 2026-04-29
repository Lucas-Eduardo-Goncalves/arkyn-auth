import { ChangeUserPasswordUseCase } from "../../../app/useCases/user/changeUserPasswordUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { changeUserPasswordSchema } from "../../schemas/internal/user";

class ChangeUserPasswordController {
  constructor(private changeUserPasswordUseCase: ChangeUserPasswordUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(
        changeUserPasswordSchema,
      );

      const data = schemaValidator.validate({ userId, ...body });

      const user = await this.changeUserPasswordUseCase.execute(data);
      return route.response.json(user, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ChangeUserPasswordController };
