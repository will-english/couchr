import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import ControlledCarousel2 from './CouchrCarousel'
// import MainPage from './MainPage'
import MyMovieLists from '../Watchlists/MyMovieLists'


it('has a radio button with proper settings', () => {
  const { container } = render(<MyMovieLists
                                 />);
  const inputs = container.getElementsByTagName('h1');
  expect(inputs.length).toEqual(1);
});

