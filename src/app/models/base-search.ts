export interface BaseSearch {
  paginate?: boolean;
  size?: number;
  page?: number;
  pageSize?: number;
  orderBy?: string[];
  sort?: string;

  // prop -> para poder usar em HttpParams({ fromObject: search });
  [prop: string]: any;
}
