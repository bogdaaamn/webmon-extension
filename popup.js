document
.getElementById('connect')
.addEventListener('click', () => {
  console.log("click")  
});

form = document
.getElementById('signup')

form.addEventListener('submit', (event) => {
  var email = event.target["email"].value
  var firstName = event.target["first_name"].value
  var lastName = event.target["last_name"].value
  var password = event.target["password"].value
  var user_type = event.target["user_type"].value


  var data = JSON.stringify({"email":email,
  "first_name":firstName,
  "last_name":lastName,
  "password":password,
  "user_type":user_type});
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "http://localhost:8000/register/");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);


  event.preventDefault();

})
