import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Shopping from './Shopping';

const cart = [{id:1, species: "a", price: 1}, {id:2, species: "b", price: 1}];
const currentUser = {id: 1, username: "testuser"};

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={['/insects']}>
        <Shopping currentUser={currentUser}cart={cart} />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
