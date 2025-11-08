import { UserRepository } from "../../../domain/repositories/user";
import { UserSearchParams } from "../../search/userSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    name?: string;
  };
};

class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const searchParams = new UserSearchParams(input);
    searchParams.setBaseSorting();

    const users = await this.userRepository.findAll(searchParams);
    return users.toJson();
  }
}

export { ListUsersUseCase };
