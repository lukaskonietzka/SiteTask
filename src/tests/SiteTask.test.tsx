import React from 'react';
import { render, screen } from '@testing-library/react';
import SiteTask from '../SiteTask';

test('renders learn react link', () => {
  render(<SiteTask />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
