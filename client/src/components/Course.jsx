import { Card } from "flowbite-react";
import { useState } from "react";
import editIcon from "../assets/images/edit_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";
import EditCourse from "./EditCourse";

function Course() {
  const [openModal, setOpenModal] = useState(false);

  const handleClickEvent = () => {
    setOpenModal(true)
  }
  return (
    <Card className="max-w-sm">
      <div className="grid grid-cols-10">
        <div className="col-span-9 text-2xl	font-bold">Introduction to Computer Science</div>
        <div>
          <div className="pb-2">
            <EditCourse isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
            <button id="edit-course-btn" aria-label="edit-course" onClick={handleClickEvent}><img className="edit-subj-img" src={editIcon} alt="edit course" /></button>
          </div>
          <div><button id="del-course-btn" aria-label="delete-course"><img className="delete-subj-img" src={deleteIcon} alt="delete course" /></button></div>
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-2 text-lg font-medium text-gray-900">Start Date:</div>
        <div className="col-span-2 text-lg font-medium text-gray-500">11/11/23</div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-2 text-lg font-medium text-gray-900">End Date:</div>
        <div className="col-span-2 text-lg font-medium text-gray-500">11/11/23</div>
      </div>
    </Card>

  );
}

export default Course;
