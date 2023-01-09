// /**
// * @jest-environment jsdom
// */

// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// // import testing library functions
// // import { BrowserRouter as Router } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { expect, test } from '@jest/globals';
// import renderer from 'react-test-renderer';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router';

// // import { within } from '@testing-library/dom';
// import Feed from '../components/ActivityFeed';
// import Post from '../components/Post';
// import Comment from '../components/Comment';
// import CreateComment from '../components/Create';
// import Posts from '../components/Posts';

// test('renders Send Button', () => {
//   const history = createMemoryHistory();
//   const { getByText } = render(
//     <Router location={history.location} navigator={history}>
//       <CreateComment />
//       ,
//     </Router>,
//   );
//   const test = getByText(/Send/);
//   expect(test).toBeInTheDocument();
// });

// test('renders Send Button', () => {
//   const history = createMemoryHistory();
//   render(<Router location={history.location} navigator={history}>
//     <CreateComment />
//     ,
//          </Router>);
//   const linkElement = screen.getByRole('button');
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders caption mario', () => {
//   const history = createMemoryHistory();
//   const component = render(<Router location={history.location} navigator={history}>
//     <CreateComment />
//     ,
//                            </Router>);
//   const linkElement = component.getByPlaceholderText
// ("Add a comment Here and Mention people using '@'");
//   expect(linkElement).toBeInTheDocument();
// });

// // test('renders username mario', () => {
// //   const history = createMemoryHistory();
// //   render(<Router location={history.location} navigator={history}>
// //               <Post />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('mario');
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('renders caption mario', () => {
// //   const history = createMemoryHistory();
// //   render(<Router location={history.location} navigator={history}>
// //               <Post />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('My First Blog');
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('renders caption yoshi', () => {
// //   const history = createMemoryHistory();
// //   render(<Router location={history.location} navigator={history}>
// //               <Post author="mario" body="https://images.unsplash.com/photo-1667976368812-31e7a836158b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" caption="dfd" id="1" userId="1" />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('Opening Party!');
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('renders username yoshi', () => {
// //   const history = createMemoryHistory();
// //   render(<Router location={history.location} navigator={history}>
// //               <Post />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('yoshi');
// //   expect(linkElement).toBeInTheDocument();
// // });

// test('renders username yoshi', () => {
//   const history = createMemoryHistory();
//   render(<Router location={history.location} navigator={history}>
//     <Comment />
//     ,
//          </Router>);
//   const linkElement = screen.getByText('username');
//   expect(linkElement).toBeInTheDocument();
// });

// test('feed matches snapshot', () => {
//   const history = createMemoryHistory();

//   const component = renderer.create(
//     <Router location={history.location} navigator={history}>
//       <Feed />
//       ,
//     </Router>,
//   );
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// // test('posts matches snapshot', () => {
// //   const history = createMemoryHistory();

// //   const component = renderer.create(
// //     <Router location={history.location} navigator={history}>
// //         <Post author="mario" body="https://images.unsplash.com/photo-1667976368812-31e7a836158b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" caption="dfd" id="1" userId="1" />,
// //     </Router>,
// //   );
// //   const tree = component.toJSON();
// //   expect(tree).toMatchSnapshot();
// // });

// // test('comment matches snapshot', () => {
// //   const history = createMemoryHistory();

// //   const component = renderer.create(
// //     <Router location={history.location} navigator={history}>
// //     <Comment />,
// // </Router>,
// //   );
// //   const tree = component.toJSON();
// //   expect(tree).toMatchSnapshot();
// // });

// test('CreateComment matches snapshot', () => {
//   const history = createMemoryHistory();

//   const component = renderer.create(
//     <Router location={history.location} navigator={history}>
//       <CreateComment />
//       ,
//     </Router>,
//   );
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// // TODO
// // test('Should call onSubmit when Send button is clicked', async () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <CreateComment />,
// //             </Router>,
// //   );
// //   await userEvent.type(component.getByRole('textbox'), 'user123@gmail.com');
// //   userEvent.click(component.getByRole('button', { name: 'Send' }));
// //   expect(onsubmit).toHaveBeenCalledWith('user123@gmail.com');
// //   // component.getByRole("");
// // });

// test('Textbox empty after clicking on a link', async () => {
//   // render the component
//   const history = createMemoryHistory();
//   const component = render(<Router location={history.location} navigator={history}>
//     <CreateComment />
//     ,
//                            </Router>);
//   // create a reference to the textbox
//   const element = component.getByRole('textbox');
//   // type some text (douala) into the textbox
//   await userEvent.type(element, 'douala');

//   // assertion: verify that the text is in the textbox
//   expect(element).toHaveValue('douala');
//   // fire a click on the a link (city) button
//   // await userEvent.click(component.getByRole('button'));

//   // assertion: verify that the textbox is empty
//   // expect(element).toHaveValue('');
// });
