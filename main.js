  'use strict';

  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCrS5JzkGQ9_vH8nSp6OigNvwuU_vSHBws",
    authDomain: "fir-chatapp-ce33d.firebaseapp.com",
    projectId: "fir-chatapp-ce33d",
    storageBucket: "fir-chatapp-ce33d.appspot.com",
    messagingSenderId: "73939751045",
    appId: "1:73939751045:web:f13be647b7dc9f8c54d9ec",
    measurementId: "G-NC66L5JYRD"
};
  // Initialize Firebase  
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();


const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const collection = db.collection('messages');


const message = document.getElementById('message');
const form = document.querySelector('form'); 

const messages = document.getElementById('messages');

collection.orderBy('created').get().then(snapshot => { 
    snapshot.forEach(doc =>{
       const li = document.createElement('li');
       li.textContent  = doc.data().message;
       messages.appendChild(li);
    });
});


form.addEventListener('submit', e =>{
     e.preventDefault();

     const li = document.createElement('li');
     li.textContent  = message.value;
     messages.appendChild(li);



    collection.add({
        message: message.value,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => {
        console.log(`${doc.id} added!`);
        message.value = '';
        message.focus();
    })
    .catch(error => {
        console.log(error);
    });
});

message.focus();