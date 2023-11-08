// The props variable is an object containing the welcomeClass helper method on the clickHandler property
function Course(props) {
    const welcomeStudent = () => {
      alert(`Welcome, ${props.name}!`)
    }
  
    return (
      <div className="container text-center">
        <div className="list-group">
          {/* In React, we can directly attach event listeners to the to the relevant markup */}
          <button 
            onClick={props.clickHandler} 
            className="list-group-item list-group-item-action list-group-item-info" 
            aria-current="true"
          >
            Greet the Students!
          </button>
          <button 
            onClick={welcomeStudent} 
            className="list-group-item list-group-item-action"
          >
            {props.name}
          </button>
        </div>
      </div>
    );
  }
  
  export default Course;
  