import { Card } from 'flowbite-react';
import { useState } from 'react';
import AddProject from './AddProject';
import EditProject from './EditProject';

import addIcon from '../assets/images/add_icon.svg';
import editIcon from '../assets/images/edit_icon.svg';
import deleteIcon from '../assets/images/delete_icon.svg';

function Project(projectData) {
  const [openAddModal, setAddModal] = useState(false);

  const [openEditModal, setEditModal] = useState(false);

  const addhandleClickEvent = () => {
    setAddModal(true)
  }
  const edithandleClickEvent = () => {
    setEditModal(true)
  }

  const project = projectData.projects;

  return (
    <Card className="max-w-sm">
      <div className="flex items-center justify-between grid grid-cols-12">
        <h5 className="col-span-11 text-xl font-bold leading-none text-gray-900 dark:text-white">Current Projects</h5>
        <AddProject isOpen={openAddModal} onCloseModal={() => setAddModal(false)} />
        <button className='col-span-1 justify-self-center' onClick={addhandleClickEvent}><img className='add-button' src={addIcon} aria-label="add project" alt="add project button" /></button>
      </div>
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
    </Card>
  );
}

export default Project;
