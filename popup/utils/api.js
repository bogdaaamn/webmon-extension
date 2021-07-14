const API_URL = 'https://60b0b5971f26610017ffeffc.mockapi.io/api/mockup/v1';

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

export async function getUserInfo() {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    // headers: myHeaders,
  };

  let response = await fetch(`${API_URL}/user/2`, requestOptions);
  let result = response.json();
  return result;
}

export async function getCause(id) {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    // headers: myHeaders,
  };

  let response = await fetch(`${API_URL}/cause/${id}`, requestOptions);
  let result= await response.json();
  return result;
}

export async function getUserCauses() {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    // headers: myHeaders,
  };

  let user = await getUserInfo();
  console.log(user.id)

  let response = await fetch(`${API_URL}/cause/`, requestOptions);
  let result= await response.json();
  return result.filter(cause => cause.creator === Number(user.id));
}

export async function postUserCauses(payload) {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Token ${token}`);

  let user = await getUserInfo();
  console.log(user.id)

  var raw = JSON.stringify({
    "creator": Number(user.id),
    "name": payload.title,
    "description": payload.description,
    "donated": 0,
    "collected": 0,
    "goal": 0
  });

  let requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
  };

  let response = await fetch(`${API_URL}/cause/`, requestOptions);
  let result= await response.json();
  return result;
}

export async function getUserDonations() {
  let token = '688f8416104559e8562f458b7b15c33a9fa41716'

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Token ${token}`);

  let requestOptions = {
    method: 'GET',
    // headers: myHeaders,
  };

  let user = await getUserInfo();
  console.log(user.id)

  let response = await fetch(`${API_URL}/donation/`, requestOptions);
  let result= await response.json();
  return result.filter(cause => cause.donor === Number(user.id));
}