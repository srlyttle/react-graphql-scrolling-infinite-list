export interface Repository {
  name: string;
  description: string;
  owner: { login: string };
  stargazers: { totalCount: number };
  primaryLanguage: { name: string };
}

export interface RepositoriesProps {
  loading: boolean;
  repos: Repository[];
  loadMoreRepos: Function;
}

export interface SearchData {
  search?: SearchDataContainer;
}

export interface SearchDataContainer {
  edges: Edge[];
  pageInfo: PageInfo;
  repositoryCount: number;
  __typename: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  __typename: string;
}

export interface Edge {
  node: RepositoryDetails;
  __typename: string;
}

export interface RepositoryDetails {
  description: string;
  name: string;
  owner: RepositoryOwner;
  primaryLanguage: PrimaryLanguage;
  stargazers: StargazerItem;
  __typename: string;
}
export interface RepositoryOwner {
  login: string;
  __typename: string;
}

export interface PrimaryLanguage {
  name: string;
  __typename: string;
}
export interface StargazerItem {
  totalCount: number;
  __typename: string;
}
