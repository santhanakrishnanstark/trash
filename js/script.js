var postObj=null;
let formToggle=false;

var formToggleBtn = document.querySelector('#formToggleBtn');
var postForm = document.querySelector('.postForm');
var stickBtn = document.querySelector('#stickbtn');

formToggleBtn.addEventListener("click", toggleForm);
stickBtn.addEventListener("click", submitPost); 

init();

function init(){
    postForm.style.display="none"; formToggle = true;
    loadData();
}

function loadData(){
   var Obj =  firebase.database().ref().child("users").orderByChild('date');
        Obj.on('value', function(snapshot){
        postObj = snapshot.val();
        if(postObj) { createView(postObj); }
   });
}

function createView(obj){
    let stick='';
    for(let o in obj){
       stick += `<div class="stick"><div class="name">${obj[o].username.replace(/[0-9]/g, '')}</div>${obj[o].post} <div class="date">posted on:${obj[o].date.substr(4,11)}</div></div>`;
    } 
    document.querySelector("#trashBin").innerHTML = stick;
    stickBtn.removeAttribute('disabled');
    document.querySelector("#name").value='';
    document.querySelector("#post").value='';
    
}

function writeUserData(name, post, date) {
    firebase.database().ref('users/' + name).set({
      username: name,
      post: post,
      date : date
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
    stickBtn.setAttribute('disabled','true');
    var name = document.querySelector("#name").value;
    var post = document.querySelector("#post").value;
    var date = new Date().toString();
    let rand = Math.random() * 99;
    if(name && post && date){
        writeUserData(name+rand.toFixed(), post, date);
        loadData();
    }else{
        alert('please Enter something...');
        loadData();
    }
}