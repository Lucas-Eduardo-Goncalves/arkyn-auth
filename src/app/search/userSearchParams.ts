import { SearchParams } from "../shared/searchParams";

type Filter = {
  name?: string;
};

class UserSearchParams extends SearchParams<Filter> {
  setBaseSorting() {
    if (!this.sort) this.sort = "createdAt";
    if (!this.sortDirection) this.sortDirection = "desc";
  }
}

export { UserSearchParams };
