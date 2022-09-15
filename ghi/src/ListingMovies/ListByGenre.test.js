import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import MovieList from  './listByGenre'


it('render movie list name for the lists', () => {
    const { container } = render(<MovieList
    />);
    const inputs = container.getElementsByClassName('container');
    expect(inputs.length).toEqual(2);
});
