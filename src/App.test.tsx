import React from 'react';
import App from './App';
import {
  TRENDING_REPOSITORIES,
  filterRepositories,
} from './apollo-client/queries/trendingRespositories';
import { MockedProvider } from '@apollo/react-testing';
import { SearchData, RepositoryDetails } from './models/common';
import { act, render } from '@testing-library/react';

const nodeData: RepositoryDetails = {
  name: 'genetic-drawing',
  owner: { login: 'anopara', __typename: 'User' },
  description: 'A genetic algorithm toy project for drawing',
  stargazers: { totalCount: 1286, __typename: 'StargazerConnection' },
  primaryLanguage: { name: 'Python', __typename: 'Language' },
  __typename: 'Repository',
};
const mockData: SearchData = {
  search: {
    edges: [
      {
        node: nodeData,
        __typename: 'SearchResultItemEdge',
      },
    ],
    pageInfo: {
      endCursor: 'Y3Vyc29yOjIw',
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: 'Y3Vyc29yOjEx',
      __typename: 'PageInfo',
    },
    repositoryCount: 841144,
    __typename: 'SearchResultItemConnection',
  },
};
const MOCKS = [
  {
    request: {
      query: TRENDING_REPOSITORIES,
      variables: { query: filterRepositories },
    },
    result: {
      data: mockData,
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders without error and shows loading indicator', async () => {
  const { container } = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <App />
    </MockedProvider>
  );
  expect(container.textContent).toBe('Loading data...');

  await wait();

  expect(container.textContent).toMatch(
    'genetic-drawing - anoparaA genetic algorithm toy project for drawing★ 1286 - Python'
  );
});
