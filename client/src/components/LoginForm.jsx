import { useMutation } from '@apollo/client';
import{ LOGIN } from '../utils/mutations'
import { useState } from 'react';
import Auth from '../utils/auth';

function LoginForm({changePage}) {
  const [userFormData, setUserFormData] = useState({email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  function switchSignUp(event) {
    event.preventDefault()
    changePage('signUp')
    setUserFormData('');
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(userFormData)
    try {
      const response = await login({
        variables: userFormData
      });

      console.log(response)
      const { token, user } = response.data.login;
      Auth.login(token);
    } catch (err) {
      console.error(error);
    }
  }

    return (
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 className="text-2xl font-semibold mb-4">Login</h1>
  <form onSubmit={handleFormSubmit}>
    {/* <!-- Username Input --> */}
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-600">Email</label>
      <input type="text" placeholder='Your email' name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off"/>
    </div>
    {/* <!-- Password Input --> */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-600">Password</label>
      <input type="password" placeholder='Your email' name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off"/>
    </div>
    {/* <!-- Login Button --> */}
    {(userFormData.email && userFormData.password) ? 
    <button 
    // disabled={!(userFormData.email && userFormData.password)} 
    type="submit" 
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Login
    </button> :
    <button disabled={true} className="bg-blue-300 py-2 px-4 w-full">Enter Login Credentials</button>
  }
    
  </form>
  {/* <!-- Sign up  Link --> */}
  <div className="mt-6 text-center">
    Don't have an account?
    <a href="" className=" text-blue-500 hover:underline" onClick={switchSignUp}> Sign up Here</a>
  </div>
</div>
    );
  }
  
  export default LoginForm;
  