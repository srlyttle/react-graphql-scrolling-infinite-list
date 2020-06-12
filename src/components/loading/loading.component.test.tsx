import React from 'react';

import { render } from '@testing-library/react';
import Loading from './loading.component';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
test('<Loading is rendered correctly', async () => {
  const loadingMessage = 'I am loading';
  const { findByText, container } = render(
    <Loading large={false} message={loadingMessage} />
  );

  const item = await findByText(loadingMessage);
  expect(item.innerHTML).toBe(loadingMessage);
  expect(container).toMatchSnapshot();
});
