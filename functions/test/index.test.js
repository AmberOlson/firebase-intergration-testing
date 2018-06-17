var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const test = require('firebase-functions-test')(config);
const assert = require('assert');
const myFunctions = require('../lib/index.js');

// Already initialized in functions/index.ts
const admin = require('firebase-admin');

describe("Greeting Cloud Function", ()=>{
  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    // Reset the database.
    admin.database().ref('greetings').remove();
  });

  // Since the below test needs to resolve promises, you will need to use `done`
  it("should say hello", (done)=>{
    let fake_request = {
      body: {
        name: "Amber",
      }
    }

    let fake_response = {
      // Your Firebase Function code will call this method.
      send: (data) => {
        // Assert response from the API
        assert.equal(data, "Hello Amber");

        // Query the database to check if the correct data was written
        let greetings = admin.database().ref('greetings');
        greetings.once("value", (snapshot)=>{
          let data = snapshot.val();
          let keys = Object.keys(data);

          // Assert the values in the Database
          assert.equal(keys.length, 1);
          assert.equal(data[keys[0]].message, "Hello Amber");

          // Let Mocha know you are done because you are in a promise.
          done();
        });

      }
    }


    myFunctions.greeter(fake_request, fake_response);

  });
});
