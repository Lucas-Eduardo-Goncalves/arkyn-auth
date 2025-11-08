import { CreateUserUseCase } from "../../../app/useCases/user/createUserUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { SchemaValidatorAdapter } from "../../adapters/schemaValidatorAdapter";
import { createUserSchema } from "../../schemas/internal/user";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createUserSchema);
      const data = schemaValidator.validate(body);

      const user = await this.createUserUseCase.execute(data);
      return route.response.json(user, 201);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { CreateUserController };
