import AddSubject from "./AddSubject";
import EditUserProfile from "./EditUser";
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


  const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleOpenAddSubjectModal = () => {
    setAddSubjectModalOpen(true);
  };

  const handleCloseAddSubjectModal = () => {
    setAddSubjectModalOpen(false);
  };

  const handleOpenEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap pb-4 bg-slate-200 pt-4 ">
        <div className="flex basis-full text-4xl justify-center lg:pe-20">My Course Planner</div>
        <div className="flex basis-full justify-center lg:justify-end pt-5 pb-3 lg:pt-0 lg:pb-0 lg:pr-10">
          <button className="border rounded px-4" id="logout-button" aria-label="logout" alt="Logout Button" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="shadow bio-div">
      {user.biography ? (
        <div className="grid grid-cols-6 row">
          <div className="col-span-5 bio-list">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="inline-block align-top pr-5">Name:</td>
                  <td>{user.first_name + " " + user.last_name}</td>
                </tr>
                <tr>
                  <td className="inline-block align-top pr-5">Biography:</td>
                  <td>{user.biography}</td>
                </tr>
                <tr>
                  <td className="inline-block align-top pr-5">Skills:</td>
                  <td>{skillsString}</td>
                </tr>
                <tr>
                  <td className="inline-block align-top pr-5">Subjects:</td>
                  <td>{subjectsString}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center col-span-12 lg:col-span-1 edit-profile">
            <EditUserProfile isOpen={editProfileModalOpen} onCloseModal={handleCloseEditProfileModal} userData={user} />
            <button className="px-4 py-1 border rounded" id="edit-profile-btn" aria-label="edit profile" alt="Edit Profile" onClick={handleOpenEditProfileModal}>Edit Profile</button>
          </div>
        </div>
      ) : (
        <div id="main-content" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 p-5 border border-blue-500 mb-4">
        <p className="text-center text-lg font-semibold text-gray-700">Please click on "Edit Profile" to fill out your Profile, {user.first_name}!</p>
        <div className="flex items-center justify-center mt-5">
          
          <div className="flex">
            <EditUserProfile isOpen={editProfileModalOpen} onCloseModal={handleCloseEditProfileModal} userData={user} />
            <button className="px-4 py-1 border rounded ml-3" id="edit-profile-btn" aria-label="edit profile" alt="Edit Profile" onClick={handleOpenEditProfileModal}>Edit Profile</button>
          </div>
        </div>
      </div>
      )}
        <div className="grid justify-items-center">
          <AddSubject isOpen={addSubjectModalOpen} onCloseModal={handleCloseAddSubjectModal} userData={user} />
          <button className="px-4 py-1 mb-2 border rounded" id="add-subject-btn" aria-label="add a subject" alt="Add a Subject" onClick={handleOpenAddSubjectModal}>Add a Subject</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
