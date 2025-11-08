import { hash as argonHash, verify as argonVerify } from "argon2";
import { HttpAdapter } from "./httpAdapter";

class PasswordAdapter {
  static async hash(password: string) {
    const passwordHash = await argonHash(password);
    return passwordHash;
  }

  static async verify(hash: string, password: string) {
    const match = await argonVerify(hash, password);
    if (!match) throw HttpAdapter.badRequest("Invalid password");
  }
}

export { PasswordAdapter };
