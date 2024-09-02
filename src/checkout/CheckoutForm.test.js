import React from 'react';
import { render } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
const currentUser = {id: 1, username: "testuser"};
const cart = [{id:1, species: "a", price: 1}, {id:2, species: "b", price: 1}];

describe('CheckoutForm', () => {
  test('renders correctly on initial load', () => {
    const { asFragment } = render(
        <CheckoutForm currentUser={currentUser} cart={cart} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});


