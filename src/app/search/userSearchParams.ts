import { SearchParams } from "../shared/searchParams";

type Filter = {
  name?: string;
};

class UserSearchParams extends SearchParams<Filter> {}

export { UserSearchParams };
