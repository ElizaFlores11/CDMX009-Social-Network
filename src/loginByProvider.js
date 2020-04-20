import {router} from './index.js';  

const db = firebase.firestore();
const usersRef = db.collection('users'); 
/*
/Process to enter google
*/
export const authGoogle = () => {  
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    const usuario = {   
      name:result.user.displayName, 
      email:result.user.email, 
      photo:result.user.photoURL, 
      description:'',
      uid:result.user.uid
     }
     usersRef.doc(result.user.uid)
       .set(usuario);  
 })
 .catch(function(error) {
  console.log('Hay un error en Google');
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    var email = error.email;
    console.log(email);
    var credential = error.credential;
    console.log(credential);
   
  });
} 
/**
 *Process to enter facebook
 */
export const authFacebook = () => {
  const providerFace = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(providerFace)
  .then(function(result) {
    const usuario = {   
      name:result.user.displayName, 
      email:result.user.email, 
      photo:result.user.photoURL, 
      description:'',
      uid:result.user.uid
     }
     usersRef.doc(result.user.uid)
       .set(usuario);  
 })
  .catch(function(error) {
  console.log('Hay un error en Facebook');
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    var email = error.email;
    console.log(email);
    var credential = error.credential;
    console.log(credential);
   
  });
} 

/**
 *Process to enter facebook
 */
export const supplierDetails = () => {
  const user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }  
} 

