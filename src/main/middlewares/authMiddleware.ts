import { HttpAdapter } from "../../infra/adapters/httpAdapter";
import { JwtAdapter } from "../../infra/adapters/jwtAdapter";
import { RouteDTO } from "../../main/types/routeDTO";

class AuthMiddleware {
  static async authenticate(route: RouteDTO) {
    const token = route?.request?.headers?.authorization;

    if (!token) throw HttpAdapter.badRequest("No token provided");
    const { userId } = await JwtAdapter.verify(token);

    return { userId };
  }
}

export { AuthMiddleware };
