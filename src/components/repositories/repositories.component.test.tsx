import React from 'react';

import { render } from '@testing-library/react';
import Repositories from './repositories.component';
import { RepositoryDetails } from '../../models/common';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const repos: RepositoryDetails[] = [
  {
    name: 'genetic-drawing',
    owner: { login: 'anopara', __typename: 'User' },
    description: 'A genetic algorithm toy project for drawing',
    stargazers: { totalCount: 1286, __typename: 'StargazerConnection' },
    primaryLanguage: { name: 'Python', __typename: 'Language' },
    __typename: 'Repository',
  },
  {
    name: '"xgenecloud"',
    owner: { login: 'xgenecloud', __typename: 'Organization' },
    description:
      'fire: :fire: Instantly generate REST & GraphQL APIs on any Database ',
    stargazers: { totalCount: 597, __typename: 'StargazerConnection' },
    primaryLanguage: { name: 'JavaScript', __typename: 'Language' },
    __typename: 'Repository',
  },
];
test('<Repositories is rendered correctly', async () => {
  const loadMoreMock = jest.fn();
  const { container } = render(
    <Repositories repos={repos} loadMoreRepos={loadMoreMock} />
  );
  expect(container).toMatchSnapshot();
});
