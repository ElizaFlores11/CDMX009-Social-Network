import {router} from './index.js';
const closeSesion = () =>{
    firebase.auth().signOut().then(function(){
      console.log('Cerrando sesión');
  
    }).catch(function(error){
      console.log(error);
    })
  }
let db= firebase.firestore();
//let userRef = db.collection('users'); 

export const renderContent = () => {
    let user3 = firebase.auth().currentUser;
    let  uid;
    if (user3 != null) {
        let uid = user3.uid;  
        console.log(uid); 
        let citiesRef = db.collection('users');
        let query = citiesRef.where('uid', '==', uid).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }

            snapshot.forEach(doc => {
                console.log(doc.data().nombre)
                console.log(doc.data().email)
                console.log(doc.data().photo)
                //console.log(doc.id, '=>', doc.data());
                let main = document.querySelector('#main');
               /* <nav class="menu">
                        <ul>
                          <li> <a href="#" id="index"> Inicio </a></li>
                          <li> <a href="#" id="profel"> Perfil </a></li>
                          
                          <li> <a href="#" id="logout"> Cerrar Sesión </a></li>
                      </ul>
                      </nav>
                   */
                let profilView = `
                <header>
                  <div class="divisor">
                    <div class="positiononeheader">
                      <img class="logo" src="images/logo.png" alt="TripLife">
                    </div>
                    <div class="positiontwoheader">
                    <nav>   
                    <div class="iconomenu" id="icono">  
                        <span>&#9776</span>
                      </div>
                    <div class="enlaces">
                      <a href="" id="index"> Inicio </a>
                       <a href="" id="profil"> Perfil </a>
                       <a href="" id="logout"> Cerrar </a>
                    </div>
                    </nav>
                    </div>
                    </div>
                </header>
                <div class="divisor">
                <div class="positionone">
                <img class="photo" src="${doc.data().photo}" /> 
            
                </div>
                <div class="positiontwo">
                    <p class="name">${doc.data().name}  ${doc.data().lastName} </p>
                    <p class="description">${doc.data().description}</p>
                    </div>
                </div>
                <div class="divisor">
                   <div class="mitad">
                    <input type="button" id="MyTrips" class="button" value="My Trips">
                    </div>
                    <div  class="mitad">
                    <input type="button" id="TripBoadr" class="button" value="Trip Board">
                    </div>
                    </div>
                  `
                main.innerHTML = profilView;

                let logout = document.querySelector("#logout");
                logout.addEventListener("click", closeSesion);
                

            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }
    
}
/*userRef.onSnapshot(snap =>  {
    let uiddata; 
    snap.forEach(doc => {
        uiddata = doc.data().uid; 
        if(uid2 == uiddata){
           console.log(uiddata);
        }
    })
})*/



/*let registerView=`<form action="" id="formNewUser" class="formNewUser">
      <figure>
        <img src="images/logo.png" alt="">
      </figure>
      <input type="text" id="name" class="input" placeholder="Name" maxlength="20">
      <input type="text" id="lastName" class="input" placeholder="Last Name" maxlength="30">
      <input type="email" id="email" class="input" placeholder="Email">
      <input type="password" id="password" class="input" placeholder="Password">
      <input type="password" id="password2" class="input" placeholder="Confirm password">
      <span id="errorMsg"> Hay un error, verifica tus datos.</span>
      <input type="button" id="send" class="button" value="Sign in">
      <p>¿Ya tienes una cuenta? <u id="loginLink">Inicia sesión</u></p>
    </form>`
    main.innerHTML = registerView
    */


     /*   var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}*/
 /*   let btnSend = document.getElementById("send");
    let loginLink = document.querySelector("#loginLink");

    btnSend.addEventListener("click",send,false);
    loginLink.addEventListener("click", f => {
        console.log('Regresa a login');
        router();
    });
*/
/* var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}*/