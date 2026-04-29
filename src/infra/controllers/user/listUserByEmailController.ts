import { ListUserByEmailUseCase } from "../../../app/useCases/user/listUserByEmailUseCase";
import { RouteDTO } from "../../../main/types/routeDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";

class ListUserByEmailController {
  constructor(private listUserByEmailUseCase: ListUserByEmailUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const email = route.request.params?.email;
      if (!email) throw new Error("Email is required");
      const user = await this.listUserByEmailUseCase.execute(email);
      return route.response.json(user, 200);
    } catch (error) {
      return ErrorHandlerAdapter.handle(error);
    }
  }
}

export { ListUserByEmailController };
