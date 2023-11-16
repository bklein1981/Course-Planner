import { Card } from "flowbite-react";
import { useState } from "react";
import editIcon from "../assets/images/edit_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";
import EditCourse from "./EditCourse";
import { useMutation } from '@apollo/client';
import{ REMOVE_SUBJECT_FROM_USER } from '../utils/mutations'

function Course(courseData) {
  const [openModal, setOpenModal] = useState(false);

  const [RemoveCourseFromUser, { error }] = useMutation(REMOVE_SUBJECT_FROM_USER);

  const handleClickEvent = () => {
    setOpenModal(true)
  }

  const deleteCourse = () => {
    
  }

  const course = courseData.course

  

  return (
    <Card className="max-w-sm">
      <div className="grid grid-cols-10">
        <div className="col-span-9 text-2xl	font-bold">{course.name}</div>
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
        <div className="col-span-2 text-lg font-medium text-gray-500">{!course.startDate ? "N/A" : course.startDate}</div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-2 text-lg font-medium text-gray-900">End Date:</div>
        <div className="col-span-2 text-lg font-medium text-gray-500">{!course.endDate ? "N/A" : course.endDate}</div>
      </div>
    </Card>

  );
}

export default Course;
