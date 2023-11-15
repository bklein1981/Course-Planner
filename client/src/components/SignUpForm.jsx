import { useState } from 'react';
import { useMutation } from '@apollo/client';
import{ADD_USER} from '../utils/mutations'
import Auth from '../utils/auth';

function SignUpForm({ changePage }) {
  const [userFormData, setUserFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const [validForm, setValidForm] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const checkForm = () =>{
    if (
      userFormData.email && 
      userFormData.password && 
      userFormData.first_name && 
      userFormData.last_name) {
        setValidForm(true);
        return true;
      } else {
        setValidForm(false);
        return false;
      }
  };

  function switchLogin(e) {
    e.preventDefault()
    changePage('login');
    setUserFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const addedUser = await addUser({
        variables: userFormData
      });

      const { token, user } = addedUser.data.addUser;
      console.log(user);
      Auth.login(token);
    } catch(err) {
      console.log(err)
    }


  }
  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={ handleFormSubmit}>
        {/* <!-- First Name Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">First Name</label>
          <input type="text" placeholder='Your First Name' name="first_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Last Name Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Last Name</label>
          <input type="text" placeholder='Your Last Name' name="last_name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Email Input --> */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Email</label>
          <input type="text" placeholder='Your email' name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Password Input --> */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" placeholder='Password' name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" onChange={handleInputChange} autoComplete="off" />
        </div>
        {/* <!-- Login Button --> */}
        {(userFormData.email && userFormData.password && userFormData.first_name && userFormData.last_name) ?
        <button 
        // disabled={!(userFormData.email && userFormData.password && userFormData.first_name && userFormData.last_name)} 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Create Account</button> :
        <button disabled={true} className="bg-blue-300 py-2 px-4 w-full">Enter Account Details</button>
        }
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
