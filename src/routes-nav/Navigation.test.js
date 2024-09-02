import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navbar';


const currentUser = {id: 1, username: "testuser"};

jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => <div>{children}</div>,
  Link: ({ onClick }) => {
    const handleClick = jest.fn(onClick);
    return <div onClick={handleClick}>Link</div>;
  },
  useNavigate: jest.fn(),
}));

test('matches snapshot', () => {
  const { asFragment } = render(
    <Navigation currentUser={currentUser} />
  );
  expect(asFragment()).toMatchSnapshot();
});