// import supertest
const request = require('supertest');
const { ObjectId } = require('mongodb');
// import the function to close the mongodb connection

const { closeMongoDBConnection, connect } = require('./dbFunctions');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /hold endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testAccountID;
  const testAccount = {
    _id: ObjectId('6348acd2e1a47ca32e79f46f'),
    time: '1519211811670',
  };
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/hold/6348acd2e1a47ca32e79f46f/')
      .send('_id=6348acd2e1a47ca32e79f46f&time=1519211811670');
    // eslint-disable-next-line no-underscore-dangle
    testAccountID = ObjectId('6348acd2e1a47ca32e79f46f');
  });

  /**
   * removes all testing data from the DB
   */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('hold').deleteOne({ _id: ObjectId('6348acd2e1a47ca32e79f46f') });
      console.log('result: ', result);
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
  test('the new holdAccount is returned', () => {
    // const insertedholdAccount = {
    //   _id: ObjectId('6348acd2e1a47ca32e79f46f'), time: 1519211811670,
    // };
    expect(JSON.parse(response.text).data).toMatchObject({}); // status code
  });

  test('the new holdAccount is in the db', async () => {
    const insertedholdAccount = await db.collection('hold').findOne({ _id: ObjectId('6348acd2e1a47ca32e79f46f') });
    expect(insertedholdAccount.time).toEqual('1519211811670');
  });

  test('Get all hold endpoint status code and data', async () => {
    const resp = await request(webapp).get('/hold/');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const holdAccountArr = JSON.parse(resp.text).data;
    // testAccount is in the response
    expect(holdAccountArr)
      .toEqual([{ _id: '507f191e810c19729de860ea', time: '1519211811670' }, { _id: '6348acd2e1a47ca32e79f46f', time: '1519211811670' }]);
  });
  // bad
  test('Get a holdAccount endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/hold/${testAccountID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const holdAccountArr = JSON.parse(resp.text).data;
    // testAccount is in the response
    expect(holdAccountArr).toMatchObject({ _id: testAccountID, ...testAccount });
  });

  test('holdAccount not in db status code 404', async () => {
    const resp = await request(webapp).get('/hold/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });

  test('delete holdAccount: status code, type and content', async () => {
  // successful deletion returns 200 status code
    const resp = await request(webapp).delete(`/hold/${testAccountID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the holdAccount is not in the database
    const resp1 = await db.collection('hold').findOne({ _id: ObjectId(testAccountID) });
    expect(resp1).toBeNull();
  });
  test('wrong holdAccount id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/hold/1');
    expect(resp.status).toEqual(404);
  });

  test('holdAccount id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/hold/638a4f8978509ad9412e2fb8');
    expect(resp.status).toEqual(404);
  });
});
