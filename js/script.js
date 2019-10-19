let formToggle=false;

var formToggleBtn = document.querySelector('#formToggleBtn');
var postForm = document.querySelector('.postForm');
var stickBtn = document.querySelector('#stickbtn');
var name = document.querySelector("#name");
var post = document.querySelector("#post");

formToggleBtn.addEventListener("click", toggleForm);
stickBtn.addEventListener("click", submitPost);

init();

function init(){
    postForm.style.display="none"; formToggle = true;
}

function writeUserData(name, post) {
    firebase.database().ref('users/' + name).set({
      username: name,
      post: post,
      date : new Date().toJSON()
    });
  }

function toggleForm(){
    if(formToggle){
        postForm.classList.add('show'); formToggle = false;
    }else{
        postForm.classList.remove('show'); formToggle = true;
    }
}

function submitPost(){
    writeUserData(name.value, post.value);
}