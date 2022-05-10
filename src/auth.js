function sign(path) {
  return async function (userData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(userData);
    console.log('sending: ', body);

    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow'
    };

    const res = await fetch(`http://127.0.0.1:5000/${path}`, requestOptions);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      return { token: null, error: data.description };
    }
    if (data.access_token) {
      return { token: data.access_token, error: '' };
    }
    return data;
  };
}

const signUp = sign('register');
const signIn = sign('auth');

// token check sends a simple get request to /user with the JWT token in the
// headers and gets the user data back if the token is valid
async function checkToken(token) {
  const headers = new Headers();
  headers.append('Authorization', `JWT ${token}`);

  var requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const res = await fetch('http://127.0.0.1:5000/user', requestOptions);
  const data = await res.json();
  if (res.status === 200) {
    console.log('user found in API', data.user);
    return data.user;
  }
  if (res.status === 401) {
    console.log(data);
    return null;
  }
}

async function signOutFromApi() {
  // need to call the logout endpoint here!
  await new Promise((r) => setTimeout(() => r(), 200));
}

export { signIn, signUp, signOutFromApi, checkToken };
