import React from 'react';
import renderer from 'react-test-renderer';
import InsectList from './InsectList';


describe('InsectList', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<InsectList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
