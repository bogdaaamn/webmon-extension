const API_URL = 'http://localhost:8000';

export function getToken() {

}

export function postAuthUser(payload) {
  var data = JSON.stringify({
    "username": payload.email,
    "password": payload.password,
  });

  var myHeaders = {
    "Content-Type": "application/json"
  };

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };

  fetch(`${API_URL}/api-token-auth/`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      let token = result['token'];

      chrome.storage.local.set({ "auth": token }, () => {
        console.log(`token ${token} is stored`)
      });

      chrome.storage.local.get(["auth"], function (items) {
        console.log(items)
      });
    })
    .catch(error => console.log('error', error));
}

export function getUserInfo() {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(`${API_URL}/user/`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export function getUserCauses() {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(`${API_URL}/cause/?search=`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.results.filter(cause => cause.creator.id === 1))
      return result.results.map(cause => cause.creator.id === 1)
    })
    .catch(error => console.log('error', error));
}