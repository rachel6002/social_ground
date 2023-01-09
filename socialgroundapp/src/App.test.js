/**
* @jest-environment jsdom
*/
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import App from './App';

test('SocialGround home page matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <App />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
