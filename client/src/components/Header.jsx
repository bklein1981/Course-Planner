import AddSubject from "./AddSubject";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from '@apollo/client';


function Header() {
  const [userId, setUserId] = useState(null); // State to store user id
  const [user, setUserData] = useState({}); // State to store user data returned from the query
  const { loading, data, error, refetch } = useQuery(QUERY_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  useEffect(() => {
    // Fetch the userId using Auth
    const loggedInUserId = Auth.getProfile()?.data?._id;
    if (loggedInUserId) {
      setUserId(loggedInUserId);
      console.log(loggedInUserId)

    } 
  }, []);


  useEffect(() => {
    if (userId) {
      // Trigger the query when userId changes
      refetch({ userId }); // Re-fetch the user data with the updated userId
    }
  }, [userId, refetch]);
   
  useEffect(() => {
    if (userId && data) {
      console.log("User Data:", data);
      const userData = data.user || {};
      console.log("User:", userData); // Log the user object
      setUserData(userData); // Set the user data in state
    }
  }, [loading, data]);
  

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  const subjectsArray = user.subjects || [];
  const subjectNamesArray = subjectsArray.map(subject => subject.name);
  const subjectsString = subjectNamesArray.join(', ');
  const skillsArray = user.skills || [];
  const skillsString = skillsArray.join(', ');


  const[openModal, setOpenModal] = useState(false);
  
  const handleClickEvent = () => {
    setOpenModal(true) }

    
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex flex-row flex-wrap pb-4 bg-slate-200 pt-4 ">
        <div className="flex lg:basis-2/3 basis-full text-4xl justify-center lg:justify-start lg:pe-20">My Course Planner</div>
        <div className="flex lg:basis-1/3 basis-full justify-center lg:justify-end pt-5 pb-3 lg:pt-0 lg:pb-0 lg:pr-10">
          <button className="border rounded px-4" id="logout-button" aria-label="logout" alt="Logout Button" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-6 row border shadow bio-div">
        <div className="col-span-5 bio-list">
          <div className="grid grid-cols-10">
            <div className="col-span-1">
              <div className="pb-2 ">Name</div>
              <div className="pb-2">Bio</div>
              <div className="pb-2">Skills</div>
              <div>Subjects</div>
            </div>
            <div className="col-span-9">
              <div className="pb-2">{user.first_name + " "+ user.last_name}</div>
              <div className="pb-2">{user.biography}</div>
              <div className="pb-2">{skillsString}</div>
              <div>{subjectsString}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center col-span-12 lg:col-span-1">
          <AddSubject isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
          <button className="my-10 px-4 border rounded" id="add-subject-btn" aria-label="add a subject" alt="Add a Subject" onClick={handleClickEvent}>Add a Subject</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
