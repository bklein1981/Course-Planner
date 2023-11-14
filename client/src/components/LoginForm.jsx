// import { useMutation } from '@apollo/client';
// import{LOGIN_USER} from '../utils/mutations'
import { useState } from 'react';

function LoginForm({changePage}) {
  const [userFormData, setUserFormData] = useState({email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  function switchSignUp(e) {
    e.preventDefault()
    changePage('signUp')
  }
    return (
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 className="text-2xl font-semibold mb-4">Login</h1>
  <form action="#" method="POST">
    {/* <!-- Username Input --> */}
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-600">Email</label>
      <input type="text" placeholder='Your email' name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
    </div>
    {/* <!-- Password Input --> */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-600">Password</label>
      <input type="password" placeholder='Your email' name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
    </div>
    {/* <!-- Login Button --> */}
    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  </form>
  {/* <!-- Sign up  Link --> */}
  <div className="mt-6 text-center">
    Don't have an account?
    <a href="#" className=" text-blue-500 hover:underline" onClick={switchSignUp}> Sign up Here</a>
  </div>
</div>
    );
  }
  
  export default LoginForm;
  