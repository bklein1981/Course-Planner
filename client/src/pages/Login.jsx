import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
function Login() {
  const [page, setPage] = useState("home");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  function handleState(newValue) {
    setPage(newValue);
 }


  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      {/* <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">      
      <button onClick={() => setPage("login")} className="mb-4 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Login</button>
      <button onClick={() => setPage("signUp")} className="mb-4 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Sign Up</button>
      </div> */}
      {page === "login" ? (
        <LoginForm changePage = {handleState}></LoginForm>
      ) : page === "signUp" ? (
        <SignUpForm changePage = {handleState}></SignUpForm>
        
      ) : (
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <button
            onClick={() => setPage("login")}
            onChange={handleInputChange}
            className="mb-4 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <button
            onClick={() => setPage("signUp")}
            className="mb-4 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
