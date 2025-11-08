import { DeleteUserUseCase } from "../../../app/useCases/user/deleteUserUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { deleteUserSchema } from "../../schemas/internal/user";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const userId = route.request.params?.userId;

      const schemaValidator = new SchemaValidatorAdapter(deleteUserSchema);
      const validatedBody = schemaValidator.validate({ userId });

      await this.deleteUserUseCase.execute(validatedBody.userId);
      return route.response.json(null, 204);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteUserController };
