
import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import NewReviewForm from './CreateNewReviewForm'


it('render movie review title input for the form', () => {
  const { container } = render(<NewReviewForm />);
  const inputs = container.getElementsByTagName('h5');
  expect(inputs.length).toEqual(1);
});


it('render three buttons on create form', () => {
    const { container } = render(<NewReviewForm />);
    const inputs = container.getElementsByTagName('button');
    expect(inputs.length).toEqual(3);
  });


it('render one input on create form', () => {
const { container } = render(<NewReviewForm />);
const inputs = container.getElementsByTagName('input');
expect(inputs.length).toEqual(1);
});


it('render one textarea on create form', () => {
    const { container } = render(<NewReviewForm />);
    const inputs = container.getElementsByTagName('textarea');
    expect(inputs.length).toEqual(1);
  });