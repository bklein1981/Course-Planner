import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import Auth from "./utils/auth.js";
function App() {
  return (
    <>
      {Auth.loggedIn() ? <Home></Home> : <Login></Login>}
      <Footer />
    </>
  );
}

export default App;
