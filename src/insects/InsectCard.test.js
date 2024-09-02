import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InsectCard from './InsectCard';
import '@testing-library/jest-dom';


const cart = [{id:1, species: "a", price: 1}, {id:2, species: "b", price: 1}];

test('render matches snapshot', () => {
  const {asFragment} = render(<InsectCard cart={cart}/>);
  expect(asFragment()).toMatchSnapshot();
});

test('clicking the button will change the text from plus to minus', async () => {
  const user = userEvent.setup()

  render(<InsectCard cart={[]} addToCart={() => {}}/>);

  // Initially, the plus button should be visible
  expect(screen.getByRole('button', {name: '+'})).toBeInTheDocument();

  // Simulate adding an item to the cart
  await user.click(screen.getByRole('button', {name: "+"}))

  // After adding, the remove button should be visible
  expect(screen.getByRole('button', {name: '-'})).toBeInTheDocument();
})
