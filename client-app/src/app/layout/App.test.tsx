import { render } from '@testing-library/react';
import App from 'app/layout/App';
import React from 'react';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
