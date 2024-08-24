export interface PopulateSearchParam {
  path: string;
  select?: string[];
  exclude?: string[];
  populate?: PopulateSearchParam[];
  strict?: boolean;
}

export interface SearchParams {
  select?: string[];
  exclude?: string[];
  populate?: PopulateSearchParam[];
  active?: boolean;
  deleted?: boolean;
  offset?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  filterBy?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
}
