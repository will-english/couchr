import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import MyMovieLists from './MyMovieLists'


it('render movie list name for the lists', () => {
  const { container } = render(<MyMovieLists
                                 />);
  const inputs = container.getElementsByTagName('h1');
  expect(inputs.length).toEqual(1);
});

