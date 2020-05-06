import Post from "./post.js";
import {editPost} from "./editPost.js";
import {deletePost} from "./deletePost.js";
import {renderContent} from "./content.js";

let db = firebase.firestore();
let usersRef = db.collection('users');
let postsRef = db.collection('posts');
let storage = firebase.storage();
let imgRef = storage.ref('images');
let main = document.querySelector('#main');

const sendPost = (post) => {
  let modal = document.getElementById("myModal");
  let likes = 0;
  console.log(post);
 
  postsRef.add({
    "text": post.text,
    "imageUrl": post.imageLink,
    "imageId": post.imageId,
    "privacy": post.privacy,
    "likes": likes,
    "date" : post.date,
    "uid": post.uid, 
    "userName": post.userName,
    "photoUser": post.photoUser
  })
  .then((data) => {
    console.log("Post guardado: " + data);
    modal.style.display = "none";
    renderContent();
  })
  .catch((error)=> {
    console.log("Error al guardar post: " + error);
  });
}

export const newPost = (userName, uid, photoUser) =>{  
  
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  let textareaPost = document.querySelector("#postText");
  let imagePost = document.querySelector("#imagePost");
  let statusPost = document.querySelector("#statusPost");
  let statusLabel = document.querySelector("label[for=statusPost]");
  let sendPostBtn = document.querySelector("#sendPostBtn");
  let imagesContainer = document.querySelector("#imagesContainer");
    
  span.onclick = function() {
    modal.style.display = "none";
    renderContent();
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      renderContent();
    }
  }

  const validate = () => {
    if(textareaPost.value.trim() == "" && imagePost.files.length == 0){
     sendPostBtn.disabled = true;
     console.log("La info es: " + textareaPost.value + imagePost.value);
   }else{
     sendPostBtn.disabled = false;
     console.log("La info es: " + textareaPost.value + imagePost.value);
   }
  }

  textareaPost.addEventListener("input", e => {
    validate();  
  });

  imagePost.addEventListener("change", e => {
    console.log(imagePost.files.length);
    console.log(imagePost.value);
    console.log(e.target.files[0]);
        
    if (imagePost.files.length != 0){
      var reader = new FileReader();
      reader.onload = function () {
        let image = `<img src="${reader.result}" class="imgPost" alt="${imagePost.files[0].name}" title="${imagePost.files[0].name}">
        <span class="remove-img">&times;</span>`
        imagesContainer.innerHTML = image;

        let removeImg = document.getElementsByClassName("remove-img")[0];
        removeImg.onclick = function() {
          let image = ``
          imagesContainer.innerHTML = image;
          imagePost.value = null;
          console.log("Usuario quitó img:" + imagePost.value);
          validate();
        }

      }
      reader.readAsDataURL(imagePost.files[0]);
      validate();  
    }else{
      let image = ``
      imagesContainer.innerHTML = image;
      validate();
    }
    
  });

  statusPost.addEventListener("change", e => {
    
    if(statusPost.checked){
      console.log(statusPost.checked);
      let privateStatus = `
      <i class="fas fa-lock" title="Privado"></i>
      `
      statusLabel.innerHTML = privateStatus;
      status = 'private';
    }else{
      console.log(statusPost.checked);
      let publicStatus = `
      <i class="fas fa-unlock" title="Público"></i>
      `
      statusLabel.innerHTML = publicStatus;
      status = 'public';
    }
  });

  sendPostBtn.addEventListener("click", e => {
    
    sendPostBtn.disabled = true;
     
    let text =  textareaPost.value;
    let img = imagePost.files[0];
    let date = new Date();
    let idImg = date.getTime();
    let imageUrl = '';
    status = ((statusPost.checked) ? 'private' : 'public');
    
    console.log(textareaPost.value);
    console.log(status);
    console.log(imagePost.files[0]);
    
    if(img){
      let token = idImg+'_'+img.name; 
      console.log("Subiendo img");  
      imgRef.child(token).put(img)
      .then(snap => {
        return snap.ref.getDownloadURL();
      })
      .then(link => {
          imageUrl = link;
          console.log(imageUrl);
          let post = new Post(text, imageUrl, token, status, date, uid, userName, photoUser);
          sendPost(post);
      })
      .catch((error)=> {
        console.log("Error al guardar imagen: " + error);
      });
    }else{
      let token = "";
      console.log("No hay img");
      let post = new Post(text, imageUrl, token, status, date, uid, userName, photoUser);
      console.log(imageUrl);
      sendPost(post);
    }
  });
}

export const renderPost = (userName, uid) =>{
  let modalBox = document.createElement('div'); 
  let postModal = `
   <!-- The Modal -->
    <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
      <!--
        <div class="modal-header">
          <span class="close">&times;</span>
        </div>-->
        <div class="modal-body">
          <span class="close">&times;</span>
          <textarea id="postText" placeholder="¿Dónde estás hoy, ${userName}?"></textarea> <br>
          <div id="imagesContainer"></div>
          <div class="icons">
            <label for="imagePost"><i class="far fa-image" title="Subir una imagen"></i></label>
            <input type="file" class="load-img" id="imagePost" name="img" accept="image/*" >
            <label for="statusPost"><i class="fas fa-unlock" title="Público"></i></label>
            <input type="checkbox" id="statusPost" value="public">
            <label for=""><i class="fas fa-map-marked-alt" title="Comparte tu ubicación"></i></label>
            
            <input id="sendPostBtn" type="button" value="Publicar" disabled>
          </div>
        </div>  
      </div>

    </div>
  `
  main.appendChild(modalBox);
  modalBox.innerHTML = postModal;
  let modal = document.getElementById("myModal");
  modal.style.display = "block"; 
}


