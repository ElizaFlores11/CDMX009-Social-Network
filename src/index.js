import  login  from './login.js';
import {renderSignin} from './signin.js';
import {renderContent} from './content.js';

const appendStyleSheet = (nameSheet) => {
  let link = document.querySelector('[title="styleSheet"]');
  link.removeAttribute('href');
  link.setAttribute('href',nameSheet);
  console.log(link);
}

export const router = (route) =>{
    // console.log(route)
    switch(route){
      case 'content':
        console.log('Entre a la vista de contenido');
        // let nameSheet = 'signinStyle.css';
        renderContent();
        appendStyleSheet('contentStyle.css');
         break;
       case 'profil':
         login.profil();
         break;
       case 'signin':
         console.log('Entre a la vista de registro');
        // let nameSheet = 'signinStyle.css';
         appendStyleSheet('signinStyle.css');
         renderSignin();
         break;
       default:
         //let nameSheet = 'loginStyle.css';
         login.renderLogin();
         appendStyleSheet('loginStyle.css');
         break;
    }
}

const userStatus = () => {
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Activo");
        router('content');
        // User is signed in.
        var displayName = user.displayName;
       // console.log('displayName: ' + displayName);
        var email = user.email;
        //console.log('email: ' + email);
        var emailVerified = user.emailVerified;
        //console.log('emailVerified: ' + emailVerified);
        var photoURL = user.photoURL;
        //console.log('photoURL: ' + photoURL);
        var isAnonymous = user.isAnonymous;
        //console.log('isAnonymous: ' + isAnonymous);
        var uid = user.uid;
        //console.log('uid: ' + uid);
        var providerData = user.providerData;
        //console.log('providerData: ' + providerData);
        // ...
      } else {
        console.log("Inactivo");
        router();
        // User is signed out.
        // ...
      }
      
    });
}

userStatus();

