import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const BASE_URL = 'http://localhost:8080/';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams; // wrapp as a container 
  // or wrapper, in order to extract usefull informations 
  // useSearchParams 
  // does not work here because outside the component
  const mode = searchParams.get('mode') || 'login'; // The usefull insight

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({
      message: 'Unsupported mode.'
    }), {
      status: 422
    });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  let url = BASE_URL + mode;
  console.log("URL: ", url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({
      message: 'Could not authenticate user.'
    }), {
      status: 500
    });
  }

  const responseData = await response.json();
  const token = responseData.token;

  // store the token in the local storage
  localStorage.setItem('token', token);
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  localStorage.setItem('expiration', expirationDate.toISOString());


  return redirect("/");
}