import React from 'react';
import Home from './home.component';
import {
  TRENDING_REPOSITORIES,
  filterRepositories,
} from '../apollo-client/queries/trendingRespositories';
import { MockedProvider } from '@apollo/react-testing';
import { SearchData, RepositoryDetails } from '../models/common';
import { act, render } from '@testing-library/react';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
const nodeData: RepositoryDetails = {
  name: 'genetic-drawing',
  owner: { login: 'anopara', __typename: 'User' },
  description: 'A genetic algorithm toy project for drawing',
  stargazers: { totalCount: 1286, __typename: 'StargazerConnection' },
  primaryLanguage: { name: 'Python', __typename: 'Language' },
  __typename: 'Repository',
};

const nodeData2: RepositoryDetails = {
  name: '"xgenecloud"',
  owner: { login: 'xgenecloud', __typename: 'Organization' },
  description:
    'fire: :fire: Instantly generate REST & GraphQL APIs on any Database ',
  stargazers: { totalCount: 597, __typename: 'StargazerConnection' },
  primaryLanguage: { name: 'JavaScript', __typename: 'Language' },
  __typename: 'Repository',
};

const mockData: SearchData = {
  search: {
    edges: [
      {
        node: nodeData,
        __typename: 'SearchResultItemEdge',
      },
      {
        node: nodeData2,
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
    <MockedProvider addTypename={true} mocks={MOCKS}>
      <Home />
    </MockedProvider>
  );
  expect(container.textContent).toBe('Loading data...');

  await wait();

  expect(document.querySelectorAll('ul li').length).toBe(2);
  expect(
    document.querySelectorAll('div .ant-card-head-title')[0].innerHTML
  ).toContain(nodeData.name);
  expect(container).toMatchSnapshot();
});
