import React from 'react';

import { render } from '@testing-library/react';
import Repositories from './repository-item.component';
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

const repo: RepositoryDetails = {
  name: 'genetic-drawing',
  owner: { login: 'anopara', __typename: 'User' },
  description: 'A genetic algorithm toy project for drawing',
  stargazers: { totalCount: 1286, __typename: 'StargazerConnection' },
  primaryLanguage: { name: 'Python', __typename: 'Language' },
  __typename: 'Repository',
};
test('<Repository Item is rendered correctly', async () => {
  const { container } = render(<Repositories repositoryDetails={repo} />);
  expect(container).toMatchSnapshot();
});
