import AddSubject from "./AddSubject";
import EditUserProfile from "./EditUser";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";

function Header({ user }) {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  console.log("HEADER USER", user)
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
      <div className="flex flex-col lg:flex-row justify-between items-center pb-4 bg-slate-200 pt-4">
        <div className="text-4xl lg:pe-20">My Course Planner</div>
        <div className="pt-5 pb-3 lg:pt-0 lg:pb-0 lg:pr-10">
          <button className="border rounded px-4" id="logout-button" aria-label="logout" alt="Logout Button" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="shadow bio-div">
        <div className="grid lg:grid-cols-6 sm:justify-center row">
          <div className="col-span-5 bio-list">
            <table className="table-auto ">
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
            <div className="col-span-1 flex items-center">
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <EditUserProfile isOpen={editProfileModalOpen} onCloseModal={handleCloseEditProfileModal} userData={user} />
              <button className="px-4 py-1 border rounded" id="edit-profile-btn" aria-label="edit profile" alt="Edit Profile" onClick={handleOpenEditProfileModal}>Edit Profile</button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <AddSubject isOpen={addSubjectModalOpen} onCloseModal={handleCloseAddSubjectModal} />
              <button className="px-4 py-1 border rounded" id="add-subject-btn" aria-label="add a subject" alt="Add a Subject" onClick={handleOpenAddSubjectModal}>Add a Subject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
