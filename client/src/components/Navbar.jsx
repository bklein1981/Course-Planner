// The props variable is an object containing the welcomeClass helper method on the clickHandler property
function NavBar(props) {
    const welcomeStudent = () => {
      alert(`Welcome, ${props.name}!`)
    }
  
    return (
      <div className="container text-center">

      </div>
    );
  }
  
  export default NavBar;
  