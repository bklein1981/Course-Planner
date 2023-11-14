import Subject from "../components/Subject";
import Auth from '../utils/auth.js'

function Home() {
  
    return (
        <div className="flex justify-center home-div">
         <div>
          <Subject />
          <Subject />
         </div>

        </div>
    );
  }
  
  export default Home;
  