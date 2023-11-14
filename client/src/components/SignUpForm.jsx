import { useState } from 'react';
import { useMutation } from '@apollo/client';
// import{LOGIN_USER} from '../utils/mutations'

function SignUpForm({ changePage }) {
  const [userFormData, setUserFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  function switchLogin(e) {
    e.preventDefault()
    changePage('login');
    setUserFormData('');
  }
  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form action="#" method="POST">
        {/* <!-- First Name Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">First Name</label>
          <input type="text" id="first_name" name="first_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Last Name Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Last Name</label>
          <input type="text" id="last_name" name="last_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Email Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Email</label>
          <input type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Password Input --> */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Login Button --> */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Create Account</button>
      </form>
      {/* <!-- Sign up  Link --> */}
      <div className="mt-6 text-center">
        Have an account?
        <a href="" className="hover:underline text-blue-500" onClick={switchLogin}> Login</a>
      </div>
    </div>
  );
}

export default SignUpForm;
