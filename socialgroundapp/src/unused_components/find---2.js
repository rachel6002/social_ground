// /**
// * @jest-environment jsdom
// */

// import React from 'react';
// // import testing library functions
// import '@testing-library/jest-dom/extend-expect';
// // import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { expect, test } from '@jest/globals';
// import renderer from 'react-test-renderer';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router';
// import Find from '../components/FindFriends';
// // import List from '../components/List';
// import NotFound from '../components/NotFound';

// // test('renders welcome message', () => {
// //   const { getByText } = render(<Find />);
// //   const linkElement = getByText(/Find Friends on Social Ground/);
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('renders message', () => {
// //   render(
// //     <Router>
// //       <Find />
// //     </Router>,
// //   );
// //   const linkElement = screen.getByText(/Find Friends on Social Ground/);
// //   expect(linkElement).toBeInTheDocument();
// // });

// test('Find matches snapshot', () => {
//   const history = createMemoryHistory();

//   const component = renderer.create(
//     <Router location={history.location} navigator={history}>
//       <Find />
//       ,
//     </Router>,
//   );

//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// // TODO: failed test
// test('renders welcome message', () => {
//   const history = createMemoryHistory();
//   const component = render(
//     <Router location={history.location} navigator={history}>
//       <Find />
//       ,
//     </Router>,

//   );

//   const linkElement = component.getByText('Find Friends on Social Ground');
//   expect(linkElement).toBeInTheDocument();
// });

// // test('page to have logo image', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //     <Find />
// //                            </Router>);
// //   expect(component.getByRole('img')).toBeInTheDocument();
// // });

// // TODO failed test
// test('When user enters username it is displayed', async () => {
//   const history = createMemoryHistory();
//   const component = render(
//     <Router location={history.location} navigator={history}>
//       <Find />
//       ,
//     </Router>,
//   );
//   // create a reference to the textbox
//   const element = component.getByRole('textbox');

//   // type some text (douala) into the textbox
//   await userEvent.type(element, 'douala');
//   // fire a click on the Ok button
//   // await user.click(screen.getByRole('button', {name: /OK/i}))
//   // assertion: verify that the text is in the textbox
//   expect(element).toHaveValue('douala');
// });

// // TODO failed test
// // test('list to have profile image', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <List id="1" name="Bret Watermelon"
// username="Bret" email="bwatermelon@gmail.com"
// // password="bret123" follower={[2,4]} following={[1,3]} postCount="1" />
// //             </Router>,
// //   );
// //   expect(screen.getByRole('img')).toBeInTheDocument();
// // });

// // TODO: failed test
// // test('renders welcome message', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <List />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('Karianne');
// //   expect(linkElement).toBeInTheDocument();
// // });

// // test('list snapshot', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <List />,
// //             </Router>,
// //   );
// //   const tree = component.toJSON();
// //   expect(tree).toMatchSnapshot();
// // });

// // TODO
// // test('renders username ', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <List />,
// //             </Router>,
// //   );
// //   const linkElement = screen.getByText('Bret');
// //   expect(linkElement).toBeInTheDocument();
// // });

// // TODO
// test('renders welcome message', () => {
//   const history = createMemoryHistory();
//   const component = render(
//     <Router location={history.location} navigator={history}>
//       <NotFound />
//       ,
//     </Router>,

//   );

//   const linkElement = component.getByText('Sorry');
//   expect(linkElement).toBeInTheDocument();
// });
// // TODO
// test('page not found message', () => {
//   const history = createMemoryHistory();
//   const { getByText } = render(
//     <Router location={history.location} navigator={history}>
//       <NotFound />
//       ,
//     </Router>,
//   );
//   const test = getByText('That page cannot be found');
//   expect(test).toBeInTheDocument();
// });

// test('NotFound matches snapshot', () => {
//   const history = createMemoryHistory();

//   const component = renderer.create(
//     <Router location={history.location} navigator={history}>
//       <NotFound />
//       ,
//     </Router>,
//   );

//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
// // TODO
// // test('page not found message', () => {
// //   const history = createMemoryHistory();
// //   const component = render(<Router location={history.location} navigator={history}>
// //               <List />,
// //             </Router>,
// //   );
// //   const linkElement = component.getByText('Follow');
// //   expect(linkElement).toBeInTheDocument();
// //   expect(linkElement).toHaveAttribute('type');
// // });
