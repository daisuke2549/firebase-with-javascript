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

collection.orderBy('created').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        const li = document.createElement('li');
        li.textContent = change.doc.data().message;
        messages.appendChild(li);
      }
    });
  });


form.addEventListener('submit', e =>{
     e.preventDefault();

    const val =  message.value.trim();
    if (val === ""){
        return;
    }
     

     message.value = '';
     message.focus();


    collection.add({
        message: val,
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