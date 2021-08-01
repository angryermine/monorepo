import {render} from '@testing-library/react';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import {App} from './app';

describe('<App />', () => {
  it('should render without errors', () => {
    const {container} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
