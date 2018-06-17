import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
var serviceAccount = require('path/to/SERVICE_ACCOUNT_KEY.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "DATABASEURL"
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const greeter = functions.https.onRequest((request, response) => {

  const greeting = "Hello " + request.body.name;

  let database = admin.database();
  let greetings = database.ref("greetings");
  let thisGreeting = greetings.push();

  thisGreeting.set({
    message: greeting,
  }).then(()=>{
    // When you are running this code during a test, `response.send` will actually
    // be mocked and contain your assertions.
    response.send(greeting);
  }).catch((error)=>{
    console.log(error);
    response.send(error);
  })


});
