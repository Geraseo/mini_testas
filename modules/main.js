 
 
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
 
 import {
    getDatabase,
    set
  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
  
 
 import {
    getAuth,
    createUserWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 import { firebaseConfig } from "./firebase.js";
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth = getAuth();
 
 
 //________________________
const submitBtn = document.getElementById("submitBtn");

const registerGO = (e) => {
  e.preventDefault();
  //laukliu ar uzpildyti laukai
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPass = document.getElementById("inputPass").value;

  createUserWithEmailAndPassword(auth, inputEmail, inputPass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(`new user created ${user}`);

      const loginTime = new Date();
      set(ref(database, "users/" + user.uid), {
        email: inputEmail,
        role: "simple_user",
        timestamp: `${loginTime}`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
submitBtn.addEventListener("click", registerGO);