import Course from "./Course";
import Project from "./Project";
import AddCourse from "./AddCourse";
import { useState } from "react";

import { useMutation } from '@apollo/client';

function Subject(subjectsData) {

  const [openModal, setOpenModal] = useState(false);
  console.log("SUBJECT user ",user)
  const handleClickEvent = () => {
    setOpenModal(true)
  }

  const subject = subjectsData.subjectData.subject
  const courses = subjectsData.subjectData.courses
  const projects = subjectsData.subjectData.projects
  const subjectId = subject._id;
  const courseId = courses._id;

  let coursesArray = [];

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].subject._id === subjectId) {
      coursesArray.push(courses[i])
    }
  }


  return (

    <div className="pt-4 border-2 rounded px-5 pb-5 shadow-md mb-2 subject-box">
      <div className="grid grid-rows-1 pb-5 text-center text-5xl font-semibold">{subject.name}</div>
      <div className="grid grid-rows-1 pb-5 text-center text-lg font-semibold">{subject.description}</div>
      <div className="grid grid-rows-1">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
        {coursesArray.map((courseData, index) => {
              const courseId = courseData._id
              let projectsArray = [];
                for (let i = 0; i < projects.length; i++) {
                  if (projects[i].course._id === courseId) {
                    projectsArray.push(projects[i])
                  }
                }
                return(
                <div key={index}>  
                  <Course course={courseData} />
                  {projectsArray.map((projectData, index) =>{
                    return(
                      <Project key={index} projects={projectData} />
                    )
                    
                  })}
                  
                </div>
                )
            })}
          <div>
            <AddCourse isOpen={openModal} onCloseModal={() => setOpenModal(false)} />
            <button className="border-2 rounded" id="new-course-btn" onClick={handleClickEvent}>Add New Course</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Subject;
