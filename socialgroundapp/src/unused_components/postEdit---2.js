/**
* @jest-environment jsdom
*/

// import React from 'react';
// // import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import '@testing-library/jest-dom/extend-expect';
// import '@testing-library/jest-dom';
// import { test, expect } from '@jest/globals';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { shallow } from 'enzyme';
// // import Adapter from 'enzyme-adapter-react-16';
// import { createMemoryHistory } from 'history';
// // import { node } from 'prop-types';
// import PostEdit from '../components/PostEdit';

// // configure({ adapter: new Adapter() });

// const mockSinglePost = [
//   {
//     caption: 'My First Blog',
//     body: 'image',
//     author: 'mario',
//     id: 1,
//     userId: 1,
//   },
// ];

// test('test to see if postEdit components are rendered', () => {
//   const history = createMemoryHistory();
//   const state = { post: mockSinglePost };
//   history.push('/', state);

//   // render(<Router location={{ state }}><PostEdit /></Router>, node);
//   // expect(history.location.state).toBe(mockSinglePost);

//   //   const { getByTestId, history, rerender } =
//   // renderWithRouter(<Router><PostEdit /></Router>,
//   //  { route: '/post/1', state: { post: mockSinglePost } });
//   //   rerender(<PostEdit location={history.location} />);
//   const tree = shallow(renderer.create(
//     <Router history={history}>
//       <PostEdit />
//     </Router>,
//   ));
//   expect(tree).toMatchSnapshot();
// //   expect(getByTestId).toBe(mockSinglePost);
// //   // jest.mock('react-router', () => ({
// //   //   useLocation: jest.fn().mockReturnValue({ pathname:
// //   // '/post/1', state: { post: mockSinglePost } }),
// //   // }));
// });
