TypeScript Firebase Functions Integration Testing Sample Project
====================================

We wanted to write integration tests like you would traditionally write for web apps, but for Firebase Functions and Firebase Realtime Database. The documentation is a little confusing and lacked a full example. This repo is intended to help people see a full working example.

Included is a test that:
* Invokes a Firebase Function with a Fake Request and Fake Response object.
* The Firebase Function writes data to the database and returns a response.
* Asserts that the correct data was written to the database.
* At the end of the test, deletes all of the data in the database so the next test will be run from an empty state.

# What you need to replace
* In `index.ts` replace `path/to/SERVICE_ACCOUNT_KEY.json` with your Key File that you created via the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts). Download the JSON version to your machine and place it in this project.
* In `index.ts` replace `DATABASEURL` with the URL of your project's database. You can find this URL at [Firebase Console](https://console.firebase.google.com/) > Database > my-database on the "Data" tab. The URL should look like `https://my-project-09a1f.firebaseio.com/`
* In `index.test.js` you need to replace the `var config` with the config block you get from the Project Overview page of your Firebase Console. Click on "Add Firebase to your web app" to reveal your config block.


# Notable things that make this work
* We made two changes to the `test` script in `package.json`:
	* Added the TypeScript compile (`tcs`) at the beginning so you always compile code before each test. It was annoying to remember to do this by hand everytime you wanted to run your tests.
	* Added the `--exit` flag to Mocha. Without it, your tests will simply hang at the end because an unresolved promise from accessing the database.
* In `index.test.js` in an `after` block we deleted the data in the test database.
* In `index.test.js` you do your assertions inside of your fake response.
* Make sure to use `done()` after your assertions to let Mocha handle promises properly.
* Make sure you are reading the docs and using `firebase-admin` and not plane `firebase` in cloud functions. `firebase` is for when using in client applications, `firebase-admin` is for when you are writing backend code (like in cloud functions)
