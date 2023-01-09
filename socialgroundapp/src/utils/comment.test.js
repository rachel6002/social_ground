// in package.json "test": "jest --coverage --runInBand"
// import supertest

// import the express server
const request = require('supertest');
const { ObjectId } = require('mongodb');
const webapp = require('./server');
// import the function to close the mongodb connection

const { closeMongoDBConnection, connect } = require('./dbFunctions');
// connection to the DB
let mongo;

describe('POST /comments/ endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testCommentId;
  const testComment = {
    content: 'This is a jest testing comment!',
    userId: '6389982a373e83308395e820',
  };
  /**
     * We need to make the request to the endpoint
     * before running any test
     * We need to connect to the DB for all the DB checks
     * if beforeAll is underfined
     * inside .eslinrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response

    response = await request(webapp).post('/comments/')
      .send('content=This is a jest testing comment!&userId=6389982a373e83308395e820')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    // eslint-disable-next-line no-underscore-dangle
    testCommentId = JSON.parse(response.text).data._id;
  });

  /**
   * removes all testing data from the DB
   */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('comments').deleteOne({ content: 'This is a jest testing comment!' });
      const result2 = await db.collection('posts').update({ _id: ObjectId('63a36ffc9c638f2baac5bf4a') }, { $pull: { comments: '638bdd0b34095ec1d5b4e6a8' } });
      console.log('result: ', result);
      console.log('result2: ', result2);
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the db
 * We need to close the mongoDB connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test file connection
      await closeMongoDBConnection(); // the express connection
      window.sessionStorage.clear();
    } catch (err) {
      return err;
    }
    return null;
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new comment is returned', () => {
    const insertedComment = {
      content: 'This is a jest testing comment!', userId: '6389982a373e83308395e820',
    };
    expect(JSON.parse(response.text).data).toMatchObject(insertedComment); // status code
  });

  test('the new comment is in the db', async () => {
    const insertedComment = await db.collection('comments').findOne({ content: 'This is a jest testing comment!' });
    expect(insertedComment.userId).toEqual('6389982a373e83308395e820');
  });

  test('missing a field (content) 404', async () => {
    const res = await request(webapp).post('/comments/')
      .send('userId=6389982a373e83308395e820')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(res.status).toEqual(404);
  });

  test('Get all comments endpoint status code and data', async () => {
    const resp = await request(webapp).get('/comments/').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const commentArray = JSON.parse(resp.text).data;
    // testComment is in the response
    expect(commentArray).toEqual(expect.arrayContaining([{ _id: testCommentId, ...testComment }]));
  });

  test('Get a comment endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/comments/${testCommentId}`).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userArr = JSON.parse(resp.text).data;
    // testUser is in the response
    expect(userArr).toMatchObject({ _id: testCommentId, ...testComment });
  });

  test('comment is not in db status code 404', async () => {
    const resp = await request(webapp).get('/comments/1').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });

  // test('Endpoint status code and response async/await', async () => {
  //   const postId = '6376e52e15dd8a7a841cd930';
  //   const res = await request(webapp).put(`/posts/${postId}/comments/`)
  //     .send('commentId=638bdd0b34095ec1d5b4e6a8')
  //     .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  // eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.
  // k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
  //   expect(res.status).toEqual(200);
  //   expect(res.type).toBe('application/json');

  //   // the database was updated
  //   const updatedPost = await db.collection('posts').findOne({ _id: ObjectId(postId) });
  //   const commentsUpdated = updatedPost.comments;
  //   expect(commentsUpdated[commentsUpdated.length - 1]).toEqual('638bdd0b34095ec1d5b4e6a8');
  // });

  test('missing commentId 404', async () => {
    const postId = '63a36ffc9c638f2baac5bf4a';
    const res = await request(webapp).put(`/posts/${postId}/comments/`)
      .send('')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(res.status).toEqual(404);
  });
});

// describe('POST /users endpoint tests', () => {
//     let db; // the db
//     let response; // the response from our express server
//     let testUserID;
//     const testUser = {
//       name: 'testuser',
//       email: 'user123@gmail.com',
//       password: 'test123',
//       username: 'user123',
//       follower: [],
//       following: [],
//       postCount: 0,
//     };
//     /**
//        * We need to make the request to the endpoint
//        * before running any test
//        * We need to connect to the DB for all the DB checks
//        * if beforeAll is underfined
//        * inside .eslinrc.js, add 'jest' to the 'env' key
//        */
//     beforeAll(async () => {
//       // connect to the db
//       mongo = await connect();
//       // get the db
//       db = mongo.db();
//       // send the request to the API and collect the response
//       response = await request(webapp).post('/users/')
//         .send('name=testuser&email=user123@gmail.com&password=test123&username=user123');
//       // eslint-disable-next-line no-underscore-dangle
//       testUserID = JSON.parse(response.text).data._id;
//     });

//     /**
//      * removes all testing data from the DB
//      */
//     const clearDatabase = async () => {
//       try {
//         const result = await db.collection('users').deleteOne({ name: 'testuser' });
//         console.log('result: ', result);
//       } catch (err) {
//         console.log('error: ', err.message);
//       }
//     };

//     /**
//    * After running the tests, we need to remove any test data from the db
//    * We need to close the mongoDB connection
//    */
//     afterAll(async () => {
//       // we need to clear the DB
//       try {
//         await clearDatabase();
//         await mongo.close(); // the test file connection
//         await closeMongoDBConnection(); // the express connection
//       } catch (err) {
//         return err;
//       }
//       return null;
//     });

//     /**
//    * Status code and response type
//    */
//     test('the status code is 201 and response type', () => {
//       expect(response.status).toBe(201); // status code
//       expect(response.type).toBe('application/json');
//     });

//     /**
//    * response body
//    */
//     test('the new user is returned', () => {
//       const insertedUser = {
//         name: 'testuser', email: 'user123@gmail.com',
// password: 'test123', username: 'user123', postCount: 0,
//       };
//       expect(JSON.parse(response.text).data).toMatchObject(insertedUser); // status code
//     });

//     test('the new user is in the db', async () => {
//       const insertedUser = await db.collection('users').findOne({ name: 'testuser' });
//       expect(insertedUser.name).toEqual('testuser');
//     });

//     test('missing a field (email) 404', async () => {
//       const res = await request(webapp).post('/users/')
//         .send('name=testuser&password=test123&username=user123');
//       expect(res.status).toEqual(404);
//     });

//     test('Get all users endpoint status code and data', async () => {
//       const resp = await request(webapp).get('/users/');
//       expect(resp.status).toEqual(200);
//       expect(resp.type).toBe('application/json');
//       const userArr = JSON.parse(resp.text).data;
//       // testUser is in the response
//       expect(userArr).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
//     });

//     test('Get a user endpoint status code and data', async () => {
//       const resp = await request(webapp).get(`/users/${testUserID}`);
//       expect(resp.status).toEqual(200);
//       expect(resp.type).toBe('application/json');
//       const userArr = JSON.parse(resp.text).data;
//       // testUser is in the response
//       expect(userArr).toMatchObject({ _id: testUserID, ...testUser });
//     });

//     test('user not in db status code 404', async () => {
//       const resp = await request(webapp).get('/users/1');
//       expect(resp.status).toEqual(404);
//       expect(resp.type).toBe('application/json');
//     });

//     test('Endpoint status code and response async/await', async () => {
//       const res = await request(webapp).put(`/users/${testUserID}`)
//         .send('password=newpassword123');
//       expect(res.status).toEqual(200);
//       expect(res.type).toBe('application/json');

//       // the database was updated
//       const updatedUser = await db.collection('users').findOne({ _id: ObjectId(testUserID) });
//       expect(updatedUser.password).toEqual('newpassword123');
//     });

//     test('missing password 404', async () => {
//       const res = await request(webapp).put(`/users/${testUserID}`)
//         .send('name=hello101');
//       expect(res.status).toEqual(404);
//     });

//     test('delete user: status code, type and content', async () => {
//     // successful deletion returns 200 status code
//       const resp = await request(webapp).delete(`/users/${testUserID}`);
//       expect(resp.status).toEqual(200);
//       expect(resp.type).toBe('application/json');
//       // the user is not in the database
//       const resp1 = await db.collection('users').findOne({ _id: ObjectId(testUserID) });
//       expect(resp1).toBeNull();
//     });

//     test('wrong user id format/exception - response 404', async () => {
//       const resp = await request(webapp).delete('/users/1');
//       expect(resp.status).toEqual(404);
//     });

//     test('user id not in system (correct id format) - response 404', async () => {
//       const resp = await request(webapp).delete('/users/638a4f8978509ad9412e2fb8');
//       expect(resp.status).toEqual(404);
//     });
//   });
