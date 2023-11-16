import { Card } from "flowbite-react";
import { useState } from "react";
import editIcon from "../assets/images/edit_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";
import EditCourse from "./EditCourse";
import { useMutation } from '@apollo/client';
import { REMOVE_SUBJECT_FROM_USER, ADD_PROJECT, REMOVE_COURSE_FROM_USER } from '../utils/mutations'
import AddProject from "./AddProject";
import addIcon from '../assets/images/add_icon.svg';
import Auth from '../utils/auth';

function Course(courseData) {
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setAddModal] = useState(false);
  
  const [removeCourseFromUser, { error }] = useMutation(REMOVE_COURSE_FROM_USER);

  const editCourseHandleClickEvent = () => {
    setOpenModal(true)
  }

  const addProjectHandleClickEvent = () => {
    setAddModal(true)
  }

  

  const deleteCourse = async () => {
    try {
      const token = Auth.getProfile()
      const userId = token.data._id 
      const courseId = courseData.course._id
      console.log('remove',{userId: userId, courseId: courseId})

      const response = await removeCourseFromUser({
        variables: {userId: userId, courseId: courseId}
      });
      console.log('response',response)
    } catch (err) {
      console.error(error);
    }
  }

  const course = courseData.course

  

  return (
    <Card className="max-w-sm">
      <div className="grid grid-cols-10">
        <div className="col-span-9 text-2xl	font-bold">{course.name}</div>
        <div>
          <div className="pb-2">
            <EditCourse isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
            <button id="edit-course-btn" aria-label="edit-course" onClick={editCourseHandleClickEvent}><img className="edit-subj-img" src={editIcon} alt="edit course" /></button>
          </div>
          <div><button onClick={deleteCourse} id="del-course-btn" aria-label="delete-course"><img className="delete-subj-img" src={deleteIcon} alt="delete course" /></button></div>
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
