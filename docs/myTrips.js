import {renderPost} from "./createPost.js";
import {editPost} from "./editPost.js";
import {deletePost} from "./deletePost.js";


let db= firebase.firestore();

export const readerMyTrips = () => {
  let currentUser = firebase.auth().currentUser;
  if (currentUser != null) {
    let uid = currentUser.uid;
    let postRef = db.collection('posts');
        postRef.where('uid', '==', uid).orderBy('date', 'desc').get()
        .then(snapshot => {
        if (snapshot.empty) {
          let mypost = document.querySelector('#list-post')
          mypost.innerHTML = '';
          let div = `<div class="list-content">  
          <br/><br/><br/>
           <br/><br/><br/>
          </div>`
          let nodo = document.createElement('div')
            nodo.innerHTML = div
            mypost.appendChild(nodo);
             
          console.log('No matching documents.');
        }
       let mypost = document.querySelector('#list-post')
           mypost.innerHTML = ''
           snapshot.forEach(doc => {
            let dateuser = doc.data().date; 
            let date = new Date(dateuser*1000);
            let mes = date.getMonth()+1; 
            let dia = date.getDate(); 
            let anyo = date.getYear() - 69;
            let datefinal = dia + '-' + mes + '-' + anyo; 
            let div = `
           <div class="list-content">
           <div class="infoUser-post">
           <div> 
              <img class='user-photo' src='${doc.data().photoUser}'>
              <p>${doc.data().userName}</p>
            </div>
              <p>${datefinal}</p>
            
            </div>
           <p>${doc.data().text}</p>
           <div class="imgListPost-container">
             <img class='imgListPost' src='${doc.data().imageUrl}'>
           </div>
            <br/>
          <div class="iconos">
              <div>
                <img  id='likePost' src='iconos/corazon.png' name='${doc.id}' value class='iconolike' alt="likePost"/> ${doc.data().likes}
              </div>
              <div>
                <img  id='editpost' src='iconos/edit-tools.png' name='${doc.id}' class='iconoedit' alt="EditPost" /> 
                <img  id='deletpost' src='iconos/interface.png' name='${doc.id}' class='iconodelete' alt="DeletePost" /> 
              </div>
          </div>
          </div>`
           let nodo = document.createElement('div')
               nodo.innerHTML = div
               mypost.appendChild(nodo);
              });
              let like = document.querySelectorAll(".iconolike");
              let edit = document.querySelectorAll(".iconoedit");
              let idelete = document.querySelectorAll(".iconodelete");
              
              let actionLike = (e) => {
                let  likeRef = db.collection("posts").doc(e.target.name);
                    likeRef.update({
                          likes: firebase.firestore.FieldValue.increment(1)
                    })
                    .then(() => {
                      readerMyTrips();
                    })
                    .catch((error)=> {
                      console.log('No se genero el like');
                    }); 
              };
              like.forEach((actionBtnLike) =>
                actionBtnLike.addEventListener("click", actionLike)
              );
              edit.forEach((actionBtnEdit) =>
                actionBtnEdit.addEventListener("click", e => {
                  let userName = 'usuario'; /*aquí se debe jalar el nombre del usuario*/
                  renderPost(userName, uid);
                  editPost(e.target.id);
                })
              );
              idelete.forEach((actionBtnLDelete) =>
                actionBtnLDelete.addEventListener("click", e =>{
                  deletePost(e.target.name);
                })
              );
          })
          .catch(err => {
            console.log(err); 
          });
       }
}

