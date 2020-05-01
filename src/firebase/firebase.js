import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DB_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
  };
  // Initialize Firebase
  const defaultProj = firebase.initializeApp(firebaseConfig);

const db = defaultProj.database();

export { firebase, db as default };

// db.ref('notes').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// db.ref('notes').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// db.ref('notes')
// .once('value')
// .then((snapshot) => {
//     const expenses = []
//     snapshot.forEach((expense) => {
//         expenses.push({
//             id: expense.key,
//             ...expense.val()
//         })
//     })
//     console.log(expenses);
// })

// db.ref('notes').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((expense) => {
//         expenses.push({
//             id: expense.key,
//             ...expense.val()
//         })
//     })
//     console.log(expenses);
// })

// db.ref('notes').push({
//     description: 'desc1',
//     notes: 'notes1',
//     amount: 1000,
//     createdAt: 100000
// })
// db.ref('notes').push({
//     description: 'desc2',
//     notes: 'notes2',
//     amount: 2000,
//     createdAt: 200000
// })
// db.ref('notes').push({
//     description: 'desc3',
//     notes: 'notes3',
//     amount: 3000,
//     createdAt: 300000
// })

// ref - gets the reference to the root of the db
//set value need not be an object, it can be a simple string
//   db.ref().set({
//       name: 'test',
//       age: 32,
//       location: {
//           city: 'bkk',
//           country: 'thailand'
//       }
//   });

//   db.ref('age').set(33);
//   db.ref('location/city').set('onnut');
  // if a ref is not found it will be created
//   db.ref('attributes').set({
//       weight: 75,
//       height: 173
//   })
//   db.ref('location/area').set('lumpini');

// db.ref('location/city').remove()
//     .then(() => {
//         console.log('removed successfully');
//     })
//     .catch((error) => {
//         console.log(error, 'occured')
//     })

// db.ref().update({
//     name: 'varma',
//     Age: 31,
//     age: null,
//     'attributes/fitness': 'awesome',
//     location: { //this replaces the location object,
//         city: 'Asok',
//         country: 'Thailand'
//     }
// })

// db.ref('bullshit').remove()
// .then(() => {
//     console.log('removed not existed item successfully');
// })
// .catch((error) => {
//     console.log(error, 'occured')
// })