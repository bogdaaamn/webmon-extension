(function () {
  function fnAddButtons() {
    var btn = document.createElement("button");
    btn.innerHTML = "Donate Using OUR_EXTENSION"; 
    btn.className = "button2";
    
    btn.id = "our_ex";
  
    //like_button = document.getElementById("top-level-buttons");
    var like_button = document.getElementById("logo");
    
    like_button.appendChild(btn);
  }
  
  fnAddButtons();

  function new_window(){
    console.log('the button was clicked')
    var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
      win.document.body.innerHTML = "HTML";
    }
  
  var button = document.getElementById("our_ex");
  button.addEventListener('click', new_window);

  // si esta logeado pasar, sino pedir que se conecte a ??? 
  // Como saber si esta logeado o no

  //I used Chrome Platform APIs to send a message to launch my Oauth flow, listen for user authentication, keep track of the state of the app (whether a user had authenticated or not), and to send a message to my content script to get to work fetching data. 
  

  


  })(); 

  //"background": {"scripts": ["background.js"], "persistent":false},