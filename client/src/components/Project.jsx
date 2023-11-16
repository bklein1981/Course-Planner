import { useState } from 'react';
import EditProject from './EditProject';


import editIcon from '../assets/images/edit_icon.svg';
import deleteIcon from '../assets/images/delete_icon.svg';

function Project(projectData) {


  const [openEditModal, setEditModal] = useState(false);


  const edithandleClickEvent = () => {
    setEditModal(true)
  }

  const project = projectData.projects;

  return (

      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <div className='grid grid-cols-12'>
                  <div className="col-span-9 truncate text-md font-medium text-gray-900 dark:text-white">{project.name}</div>
                  <EditProject isOpen={openEditModal} onCloseModal={() => setEditModal(false)} />
                  <button className='col-span-2 lg:justify-self-center' aria-label="edit" onClick={edithandleClickEvent}><img className='edit-button-img' src={editIcon} alt="edit button" /></button>
                  <button aria-label="delete"><img className='delete-button-img' src={deleteIcon} alt="delete button" /></button>
                </div>
                <div className="truncate text-sm text-gray-500 dark:text-gray-400">{project.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-6 pt-3">
              <div className="col-span-2 text-md font-medium text-gray-900">Start Date:</div>
              <div className="col-span-2 text-md font-medium text-gray-500">{!project.startDate ? "N/A" : project.startDate}</div>
            </div>
            <div className="grid grid-cols-6 pt-3">
              <div className="col-span-2 text-md font-medium text-gray-900">End Date:</div>
              <div className="col-span-2 text-md font-medium text-gray-500">{!project.endDate ? "N/A" : project.endDate}</div>
            </div>
          </li>

        </ul>
      </div>
    // </Card>
  );
}

export default Project;
