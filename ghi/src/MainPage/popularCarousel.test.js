// import { cleanup, fireEvent, render } from '@testing-library/react';
// import ControlledCarousel from "./PopularCarousel";


// afterEach(cleanup);

// it('Carousel goes back to start after all 15 movies', () => {
//     const { queryByLabelText, getByLabelText } = render(
//         <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//     );

//     expect(queryByLabelText(/off/i)).toBeTruthy();

//     fireEvent.click(getByLabelText(/off/i));

//     expect(queryByLabelText(/on/i)).toBeTruthy();
// });