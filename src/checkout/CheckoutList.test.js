import React from 'react';
import { render } from '@testing-library/react';
import CheckoutList from './CheckoutList';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const cart = [{id:1, species: "a", price: 1}, {id:2, species: "b", price: 1}];
const currentUser = {id: 1, username: "testuser"};

describe('CheckoutList', () => {
let getSummary = () => {
  return [];
}
  test('renders correctly', () => {
    const {asFragment} = render(<CheckoutList currentUser={currentUser}cart={cart} getSummary={getSummary}/>);
    
    expect(asFragment()).toMatchSnapshot();
  });
});