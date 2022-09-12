import { render, screen } from '@testing-library/react';
import MovieDetail from './MovieDetail';


test('renders learn react link', () => {
  render(<MovieDetail />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
