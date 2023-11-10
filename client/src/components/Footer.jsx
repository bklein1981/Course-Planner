// The props variable is an object containing the welcomeClass helper method on the clickHandler property
function Footer(props) {
    const welcomeStudent = () => {
      alert(`Welcome, ${props.name}!`)
    }
  
    return (
      <div className="container text-center">
        <p>You're Muted</p>
      </div>
    );
  }
  
  export default Footer;
  